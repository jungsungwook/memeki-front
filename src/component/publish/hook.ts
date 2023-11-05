import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slice/userSlice';
import { useImageUploadMutation } from '../../store/controller/imageController';

export const useThumbnailLogic = () => {
  const thumbnailInitUrl =
    'https://objectstorage.ap-seoul-1.oraclecloud.com/p/8FeadVUlYuHr-XPfBEUzjJVb_6J5ruYfrpQUfRHLsVEWKe3D-z6PKwcSbQnG9PWB/n/cnji5mgpam1z/b/memeki-bukket/o/thumbnail_default_memeki_dhXLIYkxPA.png';
  const [thumbnail, setThumbnail] = useState(thumbnailInitUrl);
  const { accessToken } = useSelector(selectUser);
  const [imgUpload, { isLoading }] = useImageUploadMutation();

  const GetBackThumbnail = () => {
    setThumbnail(thumbnailInitUrl);
  };

  const ChangeThumbnail = async (file: File) => {
    try {
      const response = await imgUpload({ accessToken, fileData: file });
      console.log('ChangeThumbnail res: ', response);
      console.log('ChangeThumbnail accessToken: ', accessToken);
      setThumbnail(response.data.contents[0].url);
    } catch (error) {
      console.log('ChangeThumbnail err: ', error);
    }
  };

  // 이미지 파일 선택 onChange 함수
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.includes('image/')) {
        alert('이미지 파일 형식이 아닙니다.');
      }
      ChangeThumbnail(file);
    }
  };

  // 드롭 함수
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { files } = e.dataTransfer;
    const file = files?.[0];

    if (file) {
      if (!file.type.includes('image/')) {
        alert('이미지 파일 형식이 아닙니다.');
      }
      ChangeThumbnail(file);
    }
  };

  return {
    handleFileSelect,
    handleDrop,
    thumbnail,
    isLoading,
    GetBackThumbnail,
  };
};

export const useOrderLogic = () => {
  const [order, setOrder] = useState([2]);
  const [parentText, setParentText] = useState([1]);

  // const plusOrder = () => {
  //   setOrder((order) => [...order, order + 1]);
  // };

  // const deleteOrder = () => {
  //   setOrder(order - 1);
  // };

  return { order, parentText };
};
