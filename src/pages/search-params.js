import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { SEO } from "../lib/seo";
import { useApi } from "../lib/api";
import { getCurrentDate } from "../lib/helper";
import PageLayout from "../components/frames/pages";
import Section, { SectionTitle } from "../components/frames/section";
import Drawer, { DrawerFilter, DrawerContent, FilterSet, OptionButton, FilterButton } from "../components/contents/drawer";
import { TeacherCard } from "../components/contents/cards";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const SearchParamsPage = () => {
  const navigate = useNavigate();
  const { params } = useParams();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [teacherData, setTeacherData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [inputData, setInputData] = useState({ location_type: "", category: "", date: "", time: "", payment_type: "" });
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("keyword", params);
      formData.append("limit", "10");
      const searcheddata = await apiRead(formData, "main", "search");
      if (searcheddata && searcheddata.data && searcheddata.data.length > 0) {
        setTeacherData(searcheddata.data);
        setTitle(`Hasil Pencarian "${params}": ${searcheddata.data.length} Hasil`);
        setInputData({ ...inputData, date: getCurrentDate() });
      } else {
        setTeacherData([]);
        setTitle(`Hasil Pencarian "${params}" tidak ditemukan.`);
      }
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <Fragment>
      <SEO title={`Pencarian "${params}"`} route={`/pencarian/${params}`} />
      <PageLayout as="child">
        <Section>
          <SectionTitle>{isLoading ? "Memuat hasil ..." : title}</SectionTitle>
          <Drawer>
            {width < 870 ? (
              <FilterButton onClick={() => setFilterOpen(true)} />
            ) : (
              <DrawerFilter>
                <FilterSet title="Tipe Kelas">
                  <OptionButton>Grup</OptionButton>
                  <OptionButton>Privat</OptionButton>
                </FilterSet>
                {/* <FilterSet title="Kategori">
                <Input variant="select" isSearchable isLabeled={false} radius="full" placeholder="Pilih kategori" name="time" value={inputData.category} options={catData.map((cat) => ({ value: cat.name, label: cat.name }))} onSelect={(selectedValue) => navigate(`/kategori/${toPathname(selectedValue)}`)} />
              </FilterSet> */}
                <FilterSet title="Tipe Lokasi">
                  <OptionButton>Di tempat Murid</OptionButton>
                  <OptionButton>Di tempat Guru</OptionButton>
                </FilterSet>
                {/* <FilterSet title="Lokasi">
                <OptionButton>Di tempat Murid</OptionButton>
                <OptionButton>Di tempat Guru</OptionButton>
              </FilterSet> */}
                <FilterSet title="Jadwal Belajar">
                  <Input radius="full" isLabeled={false} placeholder="Pilih jadwal" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
                  <Input radius="full" isLabeled={false} placeholder="Pilih jadwal" type="time" name="time" value={inputData.time} onChange={handleInputChange} />
                </FilterSet>
              </DrawerFilter>
            )}
            <DrawerContent>
              {teacherData.map((teacher, index) => (
                <TeacherCard isLoading={isLoading} key={index} image={teacher["teacher"].image === null ? "/jpg/fallback.jpg" : `${imgURL}/${teacher["teacher"].image}`} name={teacher["teacher"].name} location={teacher["location"]} rating={teacher["review"].length} tags={teacher["teacher"].services} onClick={() => navigate(`/guru/${teacher["teacher"].slug}`)} />
              ))}
            </DrawerContent>
          </Drawer>
        </Section>
      </PageLayout>
      {filterOpen && (
        <DrawerFilter type="float" onClose={() => setFilterOpen(false)}>
          <FilterSet title="Tipe Kelas">
            <OptionButton>Grup</OptionButton>
            <OptionButton>Privat</OptionButton>
          </FilterSet>
          {/* <FilterSet title="Kategori">
          <Input variant="select" isSearchable isLabeled={false} radius="full" placeholder="Pilih kategori" name="time" value={inputData.category} options={catData.map((cat) => ({ value: cat.name, label: cat.name }))} onSelect={(selectedValue) => navigate(`/kategori/${toPathname(selectedValue)}`)} />
        </FilterSet> */}
          <FilterSet title="Tipe Lokasi">
            <OptionButton>Di tempat Murid</OptionButton>
            <OptionButton>Di tempat Guru</OptionButton>
          </FilterSet>
          {/* <FilterSet title="Lokasi">
          <OptionButton>Di tempat Murid</OptionButton>
          <OptionButton>Di tempat Guru</OptionButton>
        </FilterSet> */}
          <FilterSet title="Jadwal Belajar">
            <Input radius="full" isLabeled={false} placeholder="Pilih jadwal" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
            <Input radius="full" isLabeled={false} placeholder="Pilih jadwal" type="time" name="time" value={inputData.time} onChange={handleInputChange} />
          </FilterSet>
        </DrawerFilter>
      )}
    </Fragment>
  );
};

export default SearchParamsPage;
