import React, { memo, useEffect, useState } from "react";
import Select from "./Select";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "../../../redux/services/appService";
import InputReadOnly from "./InputReadOnly";
import { useSelector } from "react-redux";

const Address = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { editPost } = useSelector((state) => state.post);

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");

  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");

  useEffect(() => {
    const foundProvince =
      provinces.length > 0 &&
      provinces.find((province) =>
        editPost?.address
          ?.split(",")
          ?.slice(-1)[0]
          ?.trim()
          ?.includes(province?.province_name)
      );

    const foundProvinceId = foundProvince?.province_id;
    setProvince(foundProvince ? foundProvinceId : "");
  }, [provinces, editPost?.address]);

  useEffect(() => {
    const foundDistrict =
      districts?.length > 0 &&
      districts?.find((district) =>
        editPost?.address
          ?.split(",")
          ?.slice(-2)[0]
          ?.trim()
          ?.includes(district?.district_name)
      );

    const foundDistrictId = foundDistrict?.district_id;
    setDistrict(foundDistrict ? foundDistrictId : "");
  }, [districts, editPost?.address]);

  useEffect(() => {
    const foundWard =
      wards?.length > 0 &&
      wards?.find((ward) =>
        editPost?.address
          ?.split(",")
          ?.slice(-3)[0]
          ?.trim()
          ?.includes(ward?.ward_name)
      );

    const foundWardId = foundWard?.ward_id;
    setWard(foundWard ? foundWardId : "");
  }, [wards, editPost?.address]);

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
    setDistrict("");
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
    setWard("");
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

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: exactAddress,
      province: province
        ? provinces?.find((item) => item?.province_id === province)
            ?.province_name
        : "",
    }));
  }, [
    province,
    district,
    ward,
    exactAddress,
    setPayload,
    JSON.stringify(provinces),
  ]);
  return (
    <div>
      <h2 className="font-medium text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <Select
            value={province}
            setValue={setProvince}
            label="Tỉnh/Thành phố"
            options={provinces}
            type="province"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            label="Quận/Huyện"
            value={district}
            setValue={setDistrict}
            options={districts}
            type="district"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            label="Phường/Xã"
            value={ward}
            setValue={setWard}
            options={wards}
            type="ward"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputReadOnly
          invalidFields={invalidFields}
          label="Địa chỉ chính xác"
          value={exactAddress}
        />
      </div>
    </div>
  );
};

export default memo(Address);
