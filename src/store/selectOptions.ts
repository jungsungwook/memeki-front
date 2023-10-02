const selectOptions = {
  popular: [
    { value: 'week', name: '이번 주' },
    { value: 'month', name: '이번 달' },
    { value: 'year', name: '올해' },
  ],
  global: [
    { value: 'korea', name: '국내 밈' },
    { value: 'foreign', name: '해외 밈' },
    { value: 'japan', name: '일본 밈' },
  ],
  year: [
    { value: '1900', name: '2000년 이전' },
    { value: '2000', name: '2000년 대' },
    { value: '2010', name: '2010년 대' },
    { value: '2020', name: '2020년 대' },
  ],
};

export default selectOptions;
