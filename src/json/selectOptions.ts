const selectOptions = {
  popular: [
    { value: 'week', name: '이번 주' },
    { value: 'month', name: '이번 달' },
    { value: 'year', name: '올해' },
  ],
  global: [
    { value: 'korea', name: '국내 밈', namespace: 1 },
    { value: 'foreign', name: '해외 밈', namespace: 2 },
  ],
  year: [
    { value: '2000', name: '~ 2010년', namespace: 3 },
    { value: '2010', name: '2010년 대', namespace: 4 },
    { value: '2020', name: '2020년 대', namespace: 5 },
  ],
};

export default selectOptions;
