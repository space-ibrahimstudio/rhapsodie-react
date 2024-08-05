import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { SEO } from "../lib/seo";
import { useApi } from "../lib/api";
import { getCurrentDate } from "../lib/helper";
import PageLayout from "../components/frames/pages";
import Section, { SectionTitle } from "../components/frames/section";
import Drawer, { DrawerFilter, DrawerContent, FilterSet, FilterButton, OptionButton } from "../components/contents/drawer";
import { TeacherCard } from "../components/contents/cards";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const GroupTypePage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { width } = useWindow();
  const { apiGet, apiRead } = useApi();
  const [pageInfo, setPageInfo] = useState({ title: "", path: "" });
  const [isLoading, setIsLoading] = useState(false);
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
    const formData = new FormData();
    formData.append("limit", "20");
    try {
      let teacherdata;
      switch (type) {
        case "guru-rekomendasi":
          teacherdata = await apiRead(formData, "main", "teacherrekom");
          break;
        case "penawaran-spesial":
          teacherdata = await apiRead(formData, "main", "teacherspesial");
          break;
        case "guru-privat":
          teacherdata = await apiRead(formData, "main", "teacherprivate");
          break;
        default:
          break;
      }
      setInputData({ ...inputData, date: getCurrentDate() });
      setTeacherData(teacherdata && teacherdata.data && teacherdata.data.length > 0 ? teacherdata.data : []);
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPageInfo = () => {
    switch (type) {
      case "guru-rekomendasi":
        setPageInfo({ title: "Guru Rekomendasi", path: "/guru-rekomendasi" });
        break;
      case "penawaran-spesial":
        setPageInfo({ title: "Penawaran Spesial", path: "/penawaran-spesial" });
        break;
      case "guru-privat":
        setPageInfo({ title: "Guru Privat", path: "/guru-privat" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
    getPageInfo();
  }, [type]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} route={pageInfo.path} />
      <PageLayout as="child">
        <Section>
          <SectionTitle>{isLoading ? "Memuat ..." : pageInfo.title}</SectionTitle>
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
                <Input variant="select" isSearchable isLabeled={false} radius="full" placeholder="Pilih kategori" name="time" value={inputData.category} options={catData.map((cat) => ({ value: cat.name, label: cat.name }))} onSelect={(selectedValue) => navigate(`/${toPathname(selectedValue)}`)} />
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
                <Input variant="select" isSearchable isLabeled={false} radius="full" placeholder="Pilih kategori" name="time" value={inputData.category} options={catData.map((cat) => ({ value: cat.name, label: cat.name }))} onSelect={(selectedValue) => navigate(`/${toPathname(selectedValue)}`)} />
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

export default GroupTypePage;
