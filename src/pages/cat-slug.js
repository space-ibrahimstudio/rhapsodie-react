import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { SEO } from "../lib/seo";
import { useApi } from "../lib/api";
import { getCurrentDate } from "../lib/helper";
import PageLayout from "../components/frames/pages";
import Section, { SectionTitle } from "../components/frames/section";
import Drawer, { DrawerFilter, DrawerContent, FilterSet, FilterButton, OptionButton } from "../components/contents/drawer";
import { TeacherCard } from "../components/contents/cards";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const CatSlugPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { width } = useWindow();
  const { apiGet, apiRead } = useApi();
  const { toPathname } = useContent();
  const [isLoading, setIsLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [selectedCatData, setSelectedCatData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [inputData, setInputData] = useState({ location_type: "", category: "", date: "", time: "", payment_type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    setIsLoading(true);
    try {
      const categdata = await apiGet("main", "categoryview");
      if (categdata && categdata.data && categdata.data.length > 0) {
        setCatData(categdata.data);
        const selecteddata = categdata.data.filter((item) => toPathname(item.name) === slug);
        if (selecteddata) {
          const selectedCatData = selecteddata[0];
          setInputData({ ...inputData, category: selecteddata[0].name, date: getCurrentDate() });
          setSelectedCatData(selectedCatData);
          const formData = new FormData();
          formData.append("idcat", selectedCatData.id);
          formData.append("limit", "12");
          const teacherdata = await apiRead(formData, "main", "categorydetailview");
          setTeacherData(teacherdata && teacherdata.data && teacherdata.data.length > 0 ? teacherdata.data : []);
        } else {
          setSelectedCatData([]);
        }
      }
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  return (
    <Fragment>
      <SEO title={selectedCatData.name} route={`/kategori/${slug}`} />
      <PageLayout as="child">
        <Section>
          <SectionTitle>{isLoading ? "Memuat ..." : `Kategori "${selectedCatData.name}"`}</SectionTitle>
          <Drawer>
            {width < 870 ? (
              <FilterButton onClick={() => setFilterOpen(true)} />
            ) : (
              <DrawerFilter>
                <FilterSet title="Tipe Kelas">
                  <OptionButton>Grup</OptionButton>
                  <OptionButton>Privat</OptionButton>
                </FilterSet>
                <FilterSet title="Kategori">
                  <Input id="fltr-instrument-type" variant="select" isSearchable isLabeled={false} radius="full" placeholder="Pilih kategori" name="time" value={inputData.category} options={catData.map((cat) => ({ value: cat.name, label: cat.name }))} onSelect={(selectedValue) => navigate(`/kategori/${toPathname(selectedValue)}`)} />
                </FilterSet>
                <FilterSet title="Tipe Lokasi">
                  <OptionButton>Di tempat Murid</OptionButton>
                  <OptionButton>Di tempat Guru</OptionButton>
                </FilterSet>
                {/* <FilterSet title="Lokasi">
                <OptionButton>Di tempat Murid</OptionButton>
                <OptionButton>Di tempat Guru</OptionButton>
              </FilterSet> */}
                <FilterSet title="Jadwal Belajar">
                  <Input id="fltr-learning-date" radius="full" isLabeled={false} placeholder="Pilih jadwal" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
                  <Input id="fltr-learning-time" radius="full" isLabeled={false} placeholder="Pilih jadwal" type="time" name="time" value={inputData.time} onChange={handleInputChange} />
                </FilterSet>
              </DrawerFilter>
            )}
            <DrawerContent>
              {teacherData.map((teacher, index) => (
                <TeacherCard isLoading={isLoading} key={index} image={teacher["teacher"].image === null ? "/jpg/fallback.jpg" : `${imgURL}/${teacher["teacher"].image}`} name={teacher["teacher"].name} location={teacher["location"]} rating={teacher["review"].length} tags={teacher["instruments"]} onClick={() => navigate(`/guru/${teacher["teacher"].slug}`)} />
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
          <FilterSet title="Kategori">
            <Input id="fltr-instrument-type" variant="select" isSearchable isLabeled={false} radius="full" placeholder="Pilih kategori" name="time" value={inputData.category} options={catData.map((cat) => ({ value: cat.name, label: cat.name }))} onSelect={(selectedValue) => navigate(`/kategori/${toPathname(selectedValue)}`)} />
          </FilterSet>
          <FilterSet title="Tipe Lokasi">
            <OptionButton>Di tempat Murid</OptionButton>
            <OptionButton>Di tempat Guru</OptionButton>
          </FilterSet>
          {/* <FilterSet title="Lokasi">
                <OptionButton>Di tempat Murid</OptionButton>
                <OptionButton>Di tempat Guru</OptionButton>
              </FilterSet> */}
          <FilterSet title="Jadwal Belajar">
            <Input id="fltr-learning-date" radius="full" isLabeled={false} placeholder="Pilih jadwal" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
            <Input id="fltr-learning-time" radius="full" isLabeled={false} placeholder="Pilih jadwal" type="time" name="time" value={inputData.time} onChange={handleInputChange} />
          </FilterSet>
        </DrawerFilter>
      )}
    </Fragment>
  );
};

export default CatSlugPage;
