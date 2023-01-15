/**
 * Author : Ryan
 * Date : 2022-08-14
 * Desc : index
 */

export const MAIN_ESTIMATE_RENDER_LIST = [
  // {
  //   id: 0,
  //   tab: 'ing',
  //   text: '작성 중',
  //   img: require('@asset/images/main/myestimate-ing.png'),
  //   borderBottom: true,
  // },
  {
    id: 1,
    tab: 'SENDED',
    text: '발송한 견적',
    img: require('@asset/images/main/myestimate-send.png'),
    borderBottom: true,
  },
  {
    id: 2,
    tab: 'USING',
    text: '상담 중',
    img: require('@asset/images/main/myestimate-chat.png'),
    borderBottom: false,
  },
];

export const ESTIMATE_LIST_TYPE = {
  BRAND: '브랜드로 추천받기',
  BUDGET: '예산으로 추천받기',
  MODEL: '모델명으로 추천받기',
};

export const REQUEST_LIST_TAB = [
  { id: 0, tab: 'new', text: '신규' },
  { id: 1, tab: 'all', text: '전체' },
];

export const CALL_DETAIL_LABEL = [
  { id: 0, label: '구입제품', labelType: 'category', toggle: true },
  { id: 1, label: '예산', labelType: 'budget', toggle: false },
  { id: 2, label: '구입 목적', labelType: 'purpose', toggle: false },
  { id: 3, label: '배송 지역', labelType: 'address', toggle: false },
  { id: 4, label: '견적서 첨부', labelType: 'upload', toggle: true },
  { id: 5, label: '요청 메세지', labelType: 'message', toggle: true },
];

export const CALL_OPTION_LABEL = [
  { id: 0, label: '많이 찾는 모델', labelType: 'bestSeller' },
  { id: 1, label: '매장 전시 진열 제품', labelType: 'allRegion' },
  { id: 2, label: '지역 상관 없이 견적 비교', labelType: 'display' },
];

export const CALL_NOTICE_TEXT = [
  {
    id: 0,
    title: '견적 작성시',
    content: [
      {
        id: 0,
        text: '요청[브랜드, 예산, 모델명]에 따라 견적서를 작성해 주시면 고객과의 소통이 더욱 원활할 수 있어요.',
      },
      {
        id: 1,
        text: '가급적 견적서 적용 가능 시점의 지점/당월 이벤트를 적용해서 작성해 주세요.',
      },
    ],
  },
  {
    id: 1,
    title: '견적 작성 후',
    content: [
      {
        id: 0,
        text: '다양한 혜택을 적용한 최대 혜택가를 입력하고 견적서를 제출하면 해당 [고객 연락처]가 공유됩니다.',
      },
    ],
  },
];

export const RESPONSE_LIST_TAB = [
  // { id: 0, tab: 'ing', text: '작성 중' },
  { id: 1, tab: 'SENDED', text: '발송한 견적' },
  { id: 2, tab: 'USING', text: '상담 중' },
];

export const BENEFIT_SWITCHBOX_LABEL = [
  { id: 0, label: '카드할인' },
  { id: 1, label: '상품권' },
  { id: 2, label: '포인트 캐시백' },
  { id: 3, label: '이외 지점 특별 할인' },
];

export const MODEL_TYPE = [
  { id: 0, name: 'TV' },
  { id: 1, name: '냉장고' },
  { id: 2, name: '에어컨' },
  { id: 3, name: '세탁기' },
  { id: 4, name: '건조기' },
  { id: 5, name: '의류관리기' },
  { id: 6, name: '공기청정기' },
  { id: 7, name: '식기세척기' },
  { id: 8, name: '김치냉장고' },
  { id: 9, name: '전기레인지' },
  { id: 10, name: '오븐' },
  { id: 11, name: '청소기' },
  { id: 12, name: '와인냉장고' },
  { id: 13, name: '정수기' },
];

export const ESTIMATE_PRICE_LABEL = [
  { id: 0, label: '정상가' },
  { id: 1, label: '최대 혜택가' },
];

// 수정
export const ESTIMATE_PREVIEW_LABEL = [
  { id: 0, label: '견적 리스트', value: 'productList' },
  { id: 1, label: '카드 할인', value: 'cardSale' },
  { id: 2, label: '상품권', value: 'giftCard' },
  { id: 3, label: '포인트 캐시백', value: 'point' },
  { id: 4, label: '할인 종류', value: 'saleType' },
  { id: 5, label: '지점 할인', value: 'storeSale' },
  { id: 6, label: '최대 혜택가', value: 'price' },
];

export const SIGNUP_BRAND_LIST = [
  { id: 0, name: '디지털프라자', brand: 'samsung', svg: 'samsung' },
  { id: 1, name: '베스트샵', brand: 'lg', svg: 'lg' },
  { id: 2, name: '하이마트', brand: 'himart', svg: 'himart' },
  { id: 3, name: '전자랜드', brand: 'electronic', svg: 'electronic' },
];

export const SIGNUP_NOTICE_TEXT = [
  {
    id: 0,
    title: '주의사항',
    content: [
      {
        id: 0,
        text: '해당 지점 근무 여부 및 이외 정보가 사실과 다를시(해당 지점 직원이 아닐시) 법적 책임을 질 수 있습니다.',
      },
      {
        id: 1,
        text: '발품노노파트너스 인증제도를 시행하고 있습니다.',
      },
      {
        id: 2,
        text: '전산망 및 지점 유선전화로 실제 근무하시는지 확인합니다.',
      },
    ],
  },
];

export const MYPAGE_MENU_LIST = [
  { id: 0, label: '공지사항', stack: 'notice' },
  // { id: 1, label: '자주 묻는 질문' },
  // { id: 2, label: '1:1 문의' },
  // { id: 3, label: '이용방법' },
  // { id: 4, label: '서비스 이용약관' },
  // { id: 5, label: '개인정보 수집 및 약관' },
];

export const MYINFO_MENU_LIST = [
  { id: 0, label: '매장명', value: 'store_name', type: 'input', edit: true },
  { id: 1, label: '이름', value: 'name', type: 'input', edit: false },
  { id: 2, label: '연락처', value: 'number', type: 'input', edit: true },
  { id: 3, label: '생년월일', value: 'birth', type: 'input', edit: false },
  { id: 4, label: '이메일', value: 'email', type: 'input', edit: false },
  { id: 5, label: '소개', value: 'intro', type: 'textarea', edit: true },
  {
    id: 6,
    label: '알림',
    value: 'alarm',
    type: 'radio',
    edit: true,
    description: '새로운 요청서, 메세지, 거래 푸시 알림',
  },
  {
    id: 7,
    label: '비대면 결제',
    value: 'payment_type',
    type: 'radio',
    edit: true,
    description: '비대면, 대면 결제 가능',
  },
];

export const ESTIMATE_CHAT_TAB = [
  { id: 0, name: '상담중', tab: 'ing' },
  { id: 1, name: '상담완료', tab: 'complete' },
];

// Date model : dummy
export const MAIN_SUMMARY_DATA = {
  userEstimate: {
    new: 120,
    today: 17,
  },
  myEstimate: {
    ING: 2,
    SENDED: 2,
    USING: 3,
  },
};

export const NOTICE_LIST_DATA = [
  { id: 0, title: '[필독] 발품노노 파트너스 이용방법' },
  { id: 1, title: '[필독] 이런 사용자는 신고해 주세요' },
  { id: 2, title: '[필독] 딜러 인증 제도' },
];

export const NOTICE_DETAIL_DATA = {
  id: 1,
  title: '[필독] 이런 사용자는 신고해 주세요',
  content:
    '안녕하세요 발품노노입니다.\n파트너스 이용 방법은 발품노노 파트너스 앱 하단 마이페이지 이용하기에서 확인 가능합니다.\n\n1. 견적 프로세스\n2. 거래 확정 후\n\n이외 문의 사항은 1:1 문의하기 탭에 남겨주시기 바랍니다.',
  createDate: '2022.07.12',
};

export const REQUEST_LIST_DATA = [
  {
    id: 0,
    requestType: 'brand',
    selectedBrand: 'lg',
    categoryList: [0, 1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 14000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '서울특별시 강서구',
    newPost: true,
    status: 0,
  },
  {
    id: 1,
    requestType: 'budget',
    selectedBrand: '',
    categoryList: [0, 1, 3, 4, 5, 6, 8],
    selectedBudget: 12000000,
    purchasePurpose: '이사가요',
    deliveryAddress: '인천광역시 계양구',
    newPost: true,
    status: 0,
  },
  {
    id: 2,
    requestType: 'model',
    selectedBrand: '',
    categoryList: [0, 1, 3, 4, 6, 8, 9],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '경기도 수원시',
    newPost: true,
    status: 0,
  },
  {
    id: 3,
    requestType: 'model',
    selectedBrand: '',
    categoryList: [2, 3, 4, 5, 8, 9],
    selectedBudget: 20000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '서울특별시 강남구',
    newPost: false,
    status: 1,
  },
  {
    id: 4,
    requestType: 'model',
    selectedBrand: '',
    categoryList: [0, 1, 3, 4, 5, 6, 8, 9, 11],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '서울특별시 관악구',
    newPost: false,
    status: 0,
  },
  {
    id: 5,
    requestType: 'budget',
    selectedBrand: '',
    categoryList: [1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 9000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '경기도 안산시',
    newPost: false,
    status: 2,
  },
  {
    id: 6,
    requestType: 'brand',
    selectedBrand: 'samsung',
    categoryList: [1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '부산광역시 해운대구',
    newPost: false,
    status: 3,
  },
  {
    id: 7,
    requestType: 'model',
    categoryList: [0, 1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '경기도 안양시',
    newPost: false,
  },
];

export const REQUEST_DETAIL_DATA = {
  id: 0,
  requestType: 'brand',
  selectedBrand: 'samsung',
  selectedBudget: 9000000,
  purchasePurpose: '결혼해요',
  deliveryAddress: '서울특별시 관악구',
  uploadImage:
    'https://www.dignited.com/wp-content/uploads/2020/04/Google-Docs-Header-1280x720-1-768x432.png',
  message:
    '예산은 한정적이지만 가능 부분만이라도 삼성전자 비스포크로 맞추고 싶습니다. 3곳 견적 받아 봤는데 받을때마다 견적이 바껴서 헷갈리네요. 스펙도 맞고',
  option: [0, 1],
  status: 0,
  categoryList: [
    { id: 0, name: 'TV', modelName: 'VL98HJSK', tags: [] },
    {
      id: 1,
      name: '냉장고',
      modelName: '',
      tags: {
        tag_list: ['900L', '4도어', '비스포크'],
        message: '색상은 위 아래 같은 색으로 부탁드립니다.',
      },
    },
    {
      id: 3,
      name: '세탁기',
      modelName: '',
      tags: {
        tag_list: ['드럼형', '-21Kg', '비스포크'],
        message: '세탁기 건조기 타워형으로 살 예정입니다.',
      },
    },
    {
      id: 4,
      name: '건조기',
      modelName: '',
      tags: {
        tag_list: ['일반', '-20Kg', '비스포크'],
        message: '건조기 타워형으로 살 예정입니다.',
      },
    },
    {
      id: 5,
      name: '의류관리기',
      modelName: 'SS98DSH',
      tags: {
        tag_list: [],
        message: '',
      },
    },
    {
      id: 7,
      name: '식기세척기',
      modelName: '',
      tags: {
        tag_list: ['삼성전자', '12인용', '비스포크'],
        message: '',
      },
    },
    {
      id: 8,
      name: '김치냉장고',
      modelName: 'K231WE-DA1',
      tags: {
        tag_list: [],
        message: '',
      },
    },
    {
      id: 9,
      name: '전자레인지',
      modelName: 'SAMHH23K',
      tags: {
        tag_list: [],
        message: '',
      },
    },
  ],
};

export const RESPONSE_ING_LIST_DATA = [
  {
    id: 0,
    requestType: 'brand',
    selectedBrand: 'lg',
    categoryList: [0, 1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 14000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '서울특별시 강서구',
    newPost: true,
    status: 1,
  },
  {
    id: 1,
    requestType: 'budget',
    selectedBrand: '',
    categoryList: [0, 1, 3, 4, 5, 6, 8],
    selectedBudget: 12000000,
    purchasePurpose: '이사가요',
    deliveryAddress: '인천광역시 계양구',
    newPost: true,
    status: 1,
  },
];

export const RESPONSE_SEND_LIST_DATA = [
  {
    id: 0,
    requestType: 'model',
    selectedBrand: '',
    categoryList: [0, 1, 3, 4, 6, 8, 9],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '경기도 수원시',
    newPost: true,
    status: 2,
  },
  {
    id: 1,
    requestType: 'model',
    selectedBrand: '',
    categoryList: [2, 3, 4, 5, 8, 9],
    selectedBudget: 20000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '서울특별시 강남구',
    newPost: false,
    status: 2,
  },
  {
    id: 2,
    requestType: 'model',
    selectedBrand: '',
    categoryList: [0, 1, 3, 4, 5, 6, 8, 9, 11],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '서울특별시 관악구',
    newPost: false,
    status: 2,
  },
  {
    id: 3,
    requestType: 'budget',
    selectedBrand: '',
    categoryList: [1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 9000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '경기도 안산시',
    newPost: false,
    status: 2,
  },
];

export const RESPONSE_CHAT_LIST_DATA = [
  {
    id: 0,
    requestType: 'model',
    categoryList: [0, 1, 3, 4, 5, 6, 8, 9],
    selectedBudget: 15000000,
    purchasePurpose: '결혼해요',
    deliveryAddress: '경기도 안양시',
    newPost: false,
    status: 3,
  },
];

export const ESTIMATE_PREVIEW_DATA = {
  id: 0,
  store: '디지털프라자 압구정점',
  salesperson: { name: '송강호 파트너', rate: '4.5', deal: 12 },
  selected_brand: '삼성전자',
  product_list: [
    'TV',
    '냉장고',
    '세탁기',
    '건조기',
    '의류관리기',
    '전자레인지',
    '김치냉장고',
    '식기세척기',
    '공기청정기',
  ],
  card_sale: true,
  gift_card: true,
  point: true,
  sale_type: '혼수',
  store_sale: false,
  retail_price: 19000000,
  price: 8200000,
  sale: 10800000,
};

export const MYINFO_DATA = {
  id: 123,
  name: '홍길동',
  number: '010-9779-6777',
  rank: 21,
  deal: 4,
  birth: '1986년6월30일',
  email: 'asdf@asdf.asd',
  intro: '안녕하세요. 홍길동입니다.',
  alarm: true,
  payment_type: true,
  store: {
    id: 0,
    name: '디지털프라자 압구정점',
    brand: 'samsung',
    svg: 'samsung',
    address: '서울특별시 강남구 압구정로 123-11, 402호',
    number: '01097796777',
  },
};

export const CHAT_ROOM_DUMMY_LIST = [
  {
    id: 0,
    partner: { id: 222, name: '고객001' },
    status: 0,
    unreadCount: 2,
    message: { user_id: 111, message: '똑똑', createAt: '2022-09-18T23:13:11', isReading: true },
  },
];

export const CHAT_MESSAGE_DUMMY_LIST = [
  { user_id: 222, message: '안녕', createAt: '2022-09-18T23:11:11', isReading: true },
  {
    user_id: 222,
    message: '나는 장규석이라고 해',
    createAt: '2022-09-18T23:12:11',
    isReading: true,
  },
  { user_id: 222, message: '견적 좀 내놓겠니?', createAt: '2022-09-18T23:13:11', isReading: true },
  { user_id: 111, message: '싸게 줄게 기다려봐', createAt: '2022-09-18T23:14:11', isReading: true },
  { user_id: 222, message: '알겠어', createAt: '2022-09-18T23:15:11', isReading: true },
  { user_id: 111, message: '기다렸지?', createAt: '2022-09-18T23:16:11', isReading: false },
  { user_id: 111, message: '저기요?', createAt: '2022-09-18T23:17:11', isReading: false },
  { user_id: 111, message: '들리세요?', createAt: '2022-09-18T23:18:11', isReading: false },
  { user_id: 111, message: '똑똑', createAt: '2022-09-18T23:19:11', isReading: false },
];
