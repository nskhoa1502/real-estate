import React, { useEffect, useState } from "react";
import Select from "./Select";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "../../../redux/services/appService";
import InputReadOnly from "./InputReadOnly";

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState(null);
  useEffect(() => {
    const fetchPublicProvinces = async () => {
      try {
        const res = await apiGetPublicProvinces();
        // console.log(res.results);
        setProvinces(res?.data?.results);
      } catch (err) {
        throw err;
      }
    };

    fetchPublicProvinces();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      try {
        const res = await apiGetPublicDistrict(province);
        // console.log(res.data);
        setDistricts(res?.data?.results);
      } catch (err) {
        throw err;
      }
    };

    province && fetchPublicDistrict();
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard(null);
    const fetchPublicWard = async () => {
      try {
        const res = await apiGetPublicWard(district);
        // console.log(res.data);
        setWards(res?.data?.results);
      } catch (err) {
        throw err;
      }
    };

    district && fetchPublicWard();
    !district && setWards([]);
  }, [district]);

  //   console.log(`province`, province);
  //   console.log(`district`, district);
  //   console.log(`ward`, ward);

  const exactAddress = `${
    ward ? `${wards.find((item) => item.ward_id === ward)?.ward_name},` : ""
  } ${
    district
      ? `${
          districts.find((item) => item.district_id === district)?.district_name
        },`
      : ""
  } ${
    province
      ? `${
          provinces.find((item) => item?.province_id === province)
            ?.province_name
        }`
      : ""
  }`;

  return (
    <div>
      <h2 className="font-medium text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <Select
            value={province?.name}
            setValue={setProvince}
            label="Tỉnh/Thành phố"
            options={provinces}
            type="province"
          />
          <Select
            label="Quận/Huyện"
            value={district?.name}
            setValue={setDistrict}
            options={districts}
            type="district"
          />
          <Select
            label="Phường/Xã"
            value={ward?.name}
            setValue={setWard}
            options={wards}
            type="ward"
          />
        </div>
        <InputReadOnly label="Địa chỉ chính xác" value={exactAddress} />
      </div>
    </div>
  );
};

export default Address;
