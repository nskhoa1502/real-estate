import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetPostDetail } from "../redux/services/postService";

const DetailPage = () => {
  const { postId } = useParams();
  const [detailPost, setDetailPost] = useState({});
  console.log(postId);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await apiGetPostDetail(postId);
        setDetailPost(response.data.response);
        console.log(response.data.response);
      } catch (err) {
        throw err;
      }
    };
    fetchDetail();
  }, [postId]);
  return <div>DetailPage</div>;
};

export default DetailPage;
