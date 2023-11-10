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

export const useParentTextPageLogic = () => {
  const [newId, setNewId] = useState(1);
  const textPageForm = {
    title: '',
    content: '',
    text_uid: '0',
    order: 1,
  };
  const [parentTextPage, setParentTextPage] = useState([textPageForm]);
  const [childrenTextPage, setChildrenTextPage] = useState([] as any);

  // 부모 CUD
  const appendParentTextPage = () => {
    setNewId(newId + 1);
    parentTextPage.push({
      title: '',
      content: '',
      text_uid: newId.toString(),
      order: 1,
    });
    const parent = parentTextPage.map((item, index) =>
      index !== 0
        ? {
            ...item,
            order: parentTextPage[index - 1].order + 1,
          }
        : item,
    );
    setParentTextPage(parent);
    console.log(parentTextPage);
  };

  const changeParentTextPage = (index: number, value: string, name: string) => {
    setParentTextPage((prevParentTextPage) => [
      ...prevParentTextPage.slice(0, index),
      { ...prevParentTextPage[index], [name]: value },
      ...prevParentTextPage.slice(index + 1),
    ]);
  };

  const removeParentTextPage = (prop: number) => {
    const filteredParent = parentTextPage
      .filter((_, index) => index !== prop)
      .map((item, index) =>
        index !== 0
          ? {
              ...item,
              order: parentTextPage[index - 1].order + 1,
            }
          : item,
      );

    setParentTextPage(filteredParent);
  };

  // 자식 CUD
  const appendChildrenTextPage = (parentUid: string) => {
    childrenTextPage.push({
      title: '',
      content: '',
      parent_uid: parentUid,
      order: 1,
    });

    /* eslint-disable no-var, prefer-const */
    let cnt = 1;
    const children = childrenTextPage.map((item: any) => {
      if (item.parent_uid === parentUid) {
        const updatedItem = {
          ...item,
          order: cnt,
        };
        cnt += 1;
        return updatedItem;
      }

      return {
        ...item,
      };
    });
    setChildrenTextPage(children);
    console.log('childrenTextPage: ', childrenTextPage);
  };

  const changeChildrenTextPage = (
    index: number,
    value: string,
    name: string,
  ) => {
    console.log(name, value);
    console.log('childrenTextPage: ', childrenTextPage);
    setChildrenTextPage((prevChildrenTextPage: any) => [
      ...prevChildrenTextPage.slice(0, index),
      { ...prevChildrenTextPage[index], [name]: value },
      ...prevChildrenTextPage.slice(index + 1),
    ]);
  };

  const removeChildrenTextPage = (parentUid: string, prop: number) => {
    let cnt = 1;
    const filteredChildren = childrenTextPage
      .filter((_: any, index: number) => index !== prop)
      .map((item: any) => {
        // map 함수 내부에서는 조건문 사용 가능
        if (item.parent_uid === parentUid) {
          const updatedItem = {
            ...item,
            order: cnt,
          };
          cnt += 1;
          return updatedItem;
        }

        return {
          ...item,
        };
      });
    setChildrenTextPage(filteredChildren);
  };
  /* eslint-enable no-var, prefer-const */

  return {
    parentTextPage,
    childrenTextPage,
    appendParentTextPage,
    changeParentTextPage,
    removeParentTextPage,
    appendChildrenTextPage,
    changeChildrenTextPage,
    removeChildrenTextPage,
  };
};
