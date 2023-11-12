/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import theme from '../../styles/theme';
import likeIcon from '../../assets/images/like.svg';
import unlikeIcon from '../../assets/images/unlike.svg';
import selectBoxArrow from '../../assets/images/selectBoxArrow.svg';
import {
  ButtonBoxType,
  ContainerType,
  LineType,
  SearchBarType,
  SelectBoxType,
  SortButtonListType,
  SortButtonType,
} from '../../types/globalType';
import memeCertifyIcon from '../../assets/images/memeCertify.png';
import { ReactComponent as RecentIcon } from '../../assets/images/recent.svg';
import { ReactComponent as PopularIcon } from '../../assets/images/popular.svg';
import { ReactComponent as GlobalIcon } from '../../assets/images/global.svg';
import { ReactComponent as YearIcon } from '../../assets/images/year.svg';
import { ReactComponent as DocIcon } from '../../assets/images/pending.svg';
import selectOptions from '../../json/selectOptions';
import { SpaceContainer } from './GlobalStyle';

export const SelectBox = ({
  type, // onClick,
  publish,
  setGlobalNameSpace,
  setYearNameSpace,
}: SelectBoxType) => {
  const styles = {
    popular: css`
      width: 10.3rem;
    `,
    global: css`
      width: 10.3rem;
    `,
    year: css`
      width: 13.5rem;
    `,
  };
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectOptions[type][0].name,
  ); // selectBox의 선택된 옵션 View

  useEffect(() => {
    if (publish) {
      setSelectedOption(publish);
    } else {
      setSelectedOption(selectOptions[type][0].name);
    }
  }, [type]);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.name);
    if (type === 'global') {
      setGlobalNameSpace(option.namespace);
    } else if (type === 'year') {
      setYearNameSpace(option.namespace);
    }
    // onClick(optionName);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotationDegree(isOpen ? 0 : 180);
  };

  return (
    <div
      css={css`
        position: relative; /* 부모 요소의 위치 기준으로 */
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        z-index: 10;
        ${styles[type]}
      `}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        css={css`
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.6rem;
        `}
      >
        <div
          css={css`
            color: ${theme.palette.gray[500]};
            ${theme.typography.body2Bold};
          `}
        >
          {selectedOption}
        </div>
        <div
          css={css`
            transition: 0.3s;
            animation: none;
            transform: rotate(${rotationDegree}deg);
          `}
        >
          <img
            src={selectBoxArrow}
            alt="selectIcon"
            css={css`
              width: 1.5rem;
              height: 1rem;
            `}
          />
        </div>
      </button>
      {isOpen && (
        <ul
          css={css`
            position: absolute; /* 드롭다운 박스를 절대 위치로 설정 */
            top: 150%; /* 부모 요소 아래에 배치 */
            width: inherit;
            border-radius: 0.5rem;
            background: ${theme.palette.gray.white};
            box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
          `}
        >
          {selectOptions[type].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option)}
              css={css`
                display: flex;
                width: inherit;
                padding: 1.6rem;
                justify-content: flex-start;
                align-items: center;
                color: ${option.name === selectedOption
                  ? theme.palette.primary[500]
                  : theme.palette.gray[500]};
                ${theme.typography.body2Bold}
              `}
            >
              {option.name}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export const SearchBar = ({ large }: SearchBarType) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search') || '';
  const limitValue = 6;

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(searchTerm);

  const handleSearchChange = (e: any) => {
    const newSearchTerm = e.target.value;
    setSearchInput(newSearchTerm);
  };
  const handleSearchEnter = (e: any) => {
    if (e.key === 'Enter') {
      if (searchInput === '') {
        navigate(`/search?limit=${limitValue}`);
        return;
      }
      navigate(`/search?search=${searchInput.toString()}&limit=${limitValue}`);
    }
  };
  const handleSearchClick = () => {
    if (searchInput === '') {
      navigate(`/search?limit=${limitValue}`);
      return;
    }
    navigate(`/search?search=${searchInput.toString()}&limit=${limitValue}`);
  };
  return (
    <div
      css={css`
        border: 3px solid ${theme.palette.primary[300]};
        display: flex;
        align-items: center;
        gap: 3.2rem;
        width: ${large ? `100%` : `59.5rem`};
        padding: 0.8rem 1.6rem;
        border-radius: 0.5rem;
      `}
    >
      <input
        value={searchInput}
        onChange={handleSearchChange}
        onKeyPress={handleSearchEnter}
        placeholder="밈을 검색해 보세요"
        css={css`
          width: inherit;
          background-color: transparent;
          ${large ? theme.typography.body1 : theme.typography.body2}
        `}
      ></input>
      <button type="button" onClick={handleSearchClick}>
        <SearchIcon
          height={`${large ? '30' : '20'}`}
          width={`${large ? '30' : '20'}`}
        />
      </button>
    </div>
  );
};

export const LikeButton = ({
  isLiked,
  children,
  onClick,
}: {
  isLiked: boolean;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        display: flex;
        gap: 0.4rem;
        cursor: ${isLiked === undefined ? 'default' : 'point'};
      `}
    >
      {isLiked ? (
        <img src={likeIcon} alt="like" />
      ) : (
        <img src={unlikeIcon} alt="unlike" />
      )}
      {children}
    </button>
  );
};

export const MemeBox = ({
  id,
  type,
  thumbnail,
  title,
  createdAt,
  isLiked,
  likeCount,
}: {
  id: number;
  type: 'auth' | 'recommend' | 'pending';
  thumbnail: string;
  title: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
}) => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <button
      type="button"
      onClick={handleBoxClick}
      css={css`
        display: flex;
        flex-direction: column;
        width: 38.4rem;
        height: 39.5rem;
        border-radius: 1.6rem;
        background: ${type === 'pending'
          ? theme.palette.gray[300]
          : theme.palette.primary[500]};
        color: ${type === 'pending' ? theme.palette.gray[600] : 'none'};
        padding: 1.6rem;
        position: relative;
      `}
    >
      {type === 'auth' && (
        <img
          src={memeCertifyIcon}
          alt="밈인증"
          loading="lazy"
          css={css`
            position: absolute;
            left: 0;
            top: 0;
          `}
        />
      )}
      <div
        css={css`
          background-color: ${theme.palette.gray.white};
          width: 35.2rem;
          height: 22.4rem;
          border-radius: 1.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          src={thumbnail}
          alt=""
          css={css`
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
          `}
        />
      </div>
      <div
        css={css`
          ${theme.typography.header2}
          margin: 3.2rem 0 4.8rem;
        `}
      >
        {title}
      </div>
      <SpaceContainer
        style={css`
          ${theme.typography.body2}
        `}
      >
        <p>{createdAt}</p>
        <LikeButton isLiked={isLiked}>{likeCount}</LikeButton>
      </SpaceContainer>
    </button>
  );
};

export const MemeBoxList = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        gap: 2.4rem;
      `}
    >
      {children}
    </div>
  );
};

export const SortButton = ({ type, isSelect, onClick }: SortButtonType) => {
  const color = isSelect
    ? `${theme.palette.primary[500]}`
    : `${theme.palette.gray[500]}`;
  let imgIcon;
  switch (type) {
    case 'recent':
      imgIcon = [<RecentIcon fill={color} />, '최신'];
      break;
    case 'popular':
      imgIcon = [<PopularIcon fill={color} />, '인기'];
      break;
    case 'global':
      imgIcon = [<GlobalIcon fill={color} />, '국가별'];
      break;
    case 'year':
      imgIcon = [<YearIcon fill={color} />, '년도별'];
      break;
    case 'pendingDoc':
      imgIcon = [<DocIcon fill={color} />, '대기 문서'];
      break;
    case 'defaultDoc':
      imgIcon = [<DocIcon fill={color} />, '추천 문서'];
      break;
    default: // do nothing;
      break;
  }

  return (
    <button
      key={type}
      type="button"
      onClick={onClick}
      css={css`
        cursor: ${onClick ? 'pointer' : 'default'};
        ${theme.typography.header1};
        color: ${color};
        display: flex;
        flex-direction: row;
        gap: 0.8rem;
      `}
    >
      {imgIcon}
    </button>
  );
};

// todo. 콘솔 warning 발생
export const SortButtonList = ({
  main,
  setGlobalNameSpace,
  setYearNameSpace,
}: SortButtonListType) => {
  const navigate = useNavigate();
  const [firstCategory, setFirstCategory] = useState(true);
  const [secondCategory, setSecondCategory] = useState(!firstCategory);
  const [selectedOption, setSelectedOption] = useState<
    'recent' | 'popular' | 'global' | 'year'
  >(main ? 'recent' : 'global');

  const handleToggleButton1 = () => {
    setFirstCategory(true);
    setSecondCategory(false);
    setSelectedOption(main ? 'recent' : 'global');
    if (!main) {
      setYearNameSpace(null);
      navigate(`/memeDoc?page=1&namespace=1`);
    }
  };

  const handleToggleButton2 = () => {
    setFirstCategory(false);
    setSecondCategory(true);
    setSelectedOption(main ? 'popular' : 'year');
    if (!main) {
      setGlobalNameSpace(null);
      navigate(`/memeDoc?page=1&namespace=3`);
    }
  };

  const buttonList: SortButtonType[] = [
    {
      type: main ? 'recent' : 'global',
      isSelect: firstCategory,
      onClick: handleToggleButton1,
    },
    {
      type: main ? 'popular' : 'year',
      isSelect: secondCategory,
      onClick: handleToggleButton2,
    },
  ];
  return (
    <SpaceContainer>
      <div
        css={css`
          display: flex;
          gap: 1.6rem;
        `}
      >
        {buttonList.map((button) => (
          <SortButton
            key={button.type}
            type={button.type}
            isSelect={button.isSelect}
            onClick={button.onClick}
          />
        ))}
      </div>
      {selectedOption !== 'recent' && (
        <SelectBox
          type={selectedOption}
          setGlobalNameSpace={setGlobalNameSpace}
          setYearNameSpace={setYearNameSpace}
        />
      )}
    </SpaceContainer>
  );
};

export const ButtonBox = ({
  type,
  submit,
  onClick,
  children,
  gray,
}: ButtonBoxType) => {
  const buttonStyles = {
    default: css`
      padding: 0.8rem 2.4rem;
    `,
    long: css`
      width: 100%;
      padding: 1.6rem;
    `,
    verySmall: css`
      padding: 0.4rem 0.8rem;
    `,
    square: css`
      width: 11rem;
      padding: 0.8rem 1.6rem;
      gap: 0.8rem;
    `,
  };
  const buttonStyle = css`
    width: auto;
    align-items: center;
    justify-content: center;
    border-radius: ${type === 'square' ? 0.8 : 5}rem;
    background-color: ${gray
      ? theme.palette.gray[200]
      : theme.palette.primary[400]};
    color: ${gray ? theme.palette.gray[300] : theme.palette.gray[500]};
    ${type === 'verySmall'
      ? theme.typography.body3Bold
      : theme.typography.body1Bold};
    ${buttonStyles[type]};

    &:active {
      transform: scale(0.98);
    }
  `;
  return (
    <button
      type={submit ? 'submit' : 'button'}
      css={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Line = ({ bold }: LineType) => {
  return (
    <hr
      css={css`
        width: 100%;
        height: 0.1rem;
        margin: 0.8rem;
        background: ${bold ? theme.palette.gray[300] : theme.palette.gray[200]};
        border: 0;
      `}
    />
  );
};
