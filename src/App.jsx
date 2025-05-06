import { useState } from 'react'
import './App.css';

// Title 컴포넌트는 페이지의 제목을 표시
function Title() {
  return (
    <h1>어느 지역을 검색하시겠습니까?</h1>
  )
}

// FilterableTouristTable 컴포넌트는 관광지 목록을 필터링할 수 있는 기능을 제공
function FilterableTouristTable({ places }) {
  const [filterText, setFilterText] = useState('');   // 필터링할 텍스트 상태를 관리

  return (
    <div>
      <SearchBar
        filterText={filterText}   // 필터링할 텍스트를 SearchBar 컴포넌트에 전달
        onFilterTextChange={setFilterText}    // 필터링할 텍스트를 변경하는 함수를 SearchBar 컴포넌트에 전달
      />
      <TouristTable
        places={places}   // 관광지 목록을 TouristTable 컴포넌트에 전달
        filterText={filterText}   // 필터링할 텍스트를 TouristTable 컴포넌트에 전달
      />
    </div>
  );
}

// SearchBar 컴포넌트는 사용자가 입력한 필터링할 텍스트를 관리
function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form>
      <input type='text' value={filterText} placeholder="자치구를 입력하세요" onChange={(e) => onFilterTextChange(e.target.value)} />   {/* 사용자가 입력한 텍스트를 onFilterTextChange 함수를 통해 상위 컴포넌트로 전달 */}
    </form>
  );
}

// TouristCategoryRow 컴포넌트는 관광지 카테고리를 표시
function TouristCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>   {/* colSpan 속성을 사용하여 카테고리 이름이 두 개의 열을 차지하도록 설정 */}
    </tr>
  )
}

// TouristRow 컴포넌트는 각 관광지의 이름과 설명을 표시
function TouristRow({ place }) {
  return (
    <tr>
      <td className='name'>
        <a href={place.link} target="_blank">
          {place.name}    {/* 관광지 이름을 클릭하면 해당 링크로 이동 */}
        </a>
        </td>
      <td>{place.descreption}</td>    {/* 관광지 설명 */}
    </tr>
  )
}

// TouristTable 컴포넌트는 관광지 목록을 표시
function TouristTable({ places, filterText }) {
  const rows = [];    // 관광지 목록을 저장할 배열
  let lastCategory = null;    // lastCategory는 마지막으로 렌더링된 카테고리를 저장하여 중복 렌더링을 방지

  Object.keys(places).forEach((category) => {
    if (filterText && category.indexOf(filterText) === -1) {
      return;   // 필터링할 텍스트가 카테고리 이름에 포함되지 않으면 해당 카테고리를 렌더링하지 않음
    }
    if (category !== lastCategory) {    // 카테고리가 마지막으로 렌더링된 카테고리와 다르면
      rows.push (
        <TouristCategoryRow category={category} key={category} />   // 카테고리 행을 추가
      );
    }
    places[category].forEach((place) => {   // 각 카테고리의 관광지 목록을 순회
      rows.push (
        <TouristRow place={place} key={place.name} />   // 관광지 행을 추가
      );
    });
    lastCategory = category;    // 마지막으로 렌더링된 카테고리를 현재 카테고리로 업데이트
  });

  return (
    <table>
      <thead>
        <tr>
          <th>관광지</th>   {/* 관광지 이름 열 */}
          <th>소개</th>   {/* 관광지 설명 열 */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>   {/* rows 배열을 tbody에 렌더링 */}
    </table>
  )
}

// PLACES 객체는 각 자치구에 해당하는 관광지 목록을 저장
const PLACES = {
  중구: [
    { name: '용두산공원', descreption: '부산광역시 중구에 있는 공원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=368&lang_cd=ko' },
    { name: '국제시장', descreption: '부산광역시 중구 신창동 1~4가 일대에 있는 재래시장', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201003001000&uc_seq=399&lang_cd=ko' },
  ],
  서구: [
    { name: '송도해수욕장', descreption: '부산광역시 서구 암남동에 있는 해수욕장', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=286&lang_cd=ko' },
    { name: '암남공원', descreption: '부산광역시 서구 암남동 산193번지 일원 진정산 일대의 자연공원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=326&lang_cd=ko' },
  ],
  동구: [
    { name: '수정 산복도로', descreption: '경사지까지 개발이 이루어지며 가장 위쪽에 자리한 도로', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=1868&lang_cd=ko' },
    { name: '초량 이바구길', descreption: '부산광역시 동구 초량동에 위치한 테마거리', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000202002001000&uc_seq=58&lang_cd=ko' },
  ],
  영도구: [
    { name: '국립해양박물관', descreption: '해양과 관련된 역사·고고·인류·민속·예술·과학·기술·산업의 유산을 수습·관리·보존·조사·연구·교육·전시를 함으로써 해양문화, 예술, 과학, 기술, 산업의 발전에 기여하기 위해 2012년 7월 9일 임시로 개관', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=257&lang_cd=ko' },
    { name: '깡깡이예술마을', descreption: '부산 자갈치시장 건너편, 영도대교, 남항대교와 맞닿은 곳에 자리 잡고 있는 수리조선마을', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=256&lang_cd=ko' },
  ],
  부산진구: [
    { name: '부산시민공원', descreption: '부산진구 범전동, 연지동 일원에 있는 공원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=354&lang_cd=ko' },
    { name: '삼광사', descreption: '부산광역시 부산진구 초읍동에 위치한 대한불교 천태종 제2의 사찰', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=347&lang_cd=ko' },
  ],
  동래구: [
    { name: '부산해양자연사박물관', descreption: '해양생물 등 자연사자료의 수집·보관·분류진열·실험·조사 연구 등을 통한 해양과학의 발전과 시민의 이해증진에 관한 사무를 분장하는 부산광역시청의 사업소', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=270&lang_cd=ko' },
    { name: '복천박물관', descreption: '고고·미술·민속·역사·인류학 영역에 속하는 자료를 수집·보관·진열·연구하여 일반관람인에게 공개하며, 아울러 이에 관한 조사·연구·계몽·선전하는 사무를 담당하는 부산광역시립박물관의 사무를 분담하기 위해 설치된 박물관', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=419&lang_cd=ko' },
  ],
  남구: [
    { name: '국립일제강제동원역사관', descreption: '대일항쟁기 강제동원 피해조사 및 국외강제동원 희생자 등 지원에 관한 특별법에 따라 대한민국 행정안전부가 설립하고 일제강제동원피해자지원재단이 운영하는 박물관', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=275&lang_cd=ko' },
    { name: '오륙도', descreption: '부산광역시 남구 용호동에 있는 우암반도 남동단에서 동남 방향으로 600m 지점 해상에 있는 섬', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=278&lang_cd=ko' },
  ],
  북구: [
    { name: '구포왜성', descreption: '부산광역시 북구 덕천동에 있는 임진왜란 때 일본군이 쌓은 일본식 성곽', link: 'https://m.blog.naver.com/bsbukgusns/221455415975' },
    { name: '화명생태공원', descreption: '부산광역시 북구 화명동, 덕천동, 금곡동, 구포동에 위치한 공원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=1434&lang_cd=ko' },
  ],
  해운대구: [
    { name: '부산 시라이프 아쿠아리움', descreption: '부산광역시 해운대구 해운대해변로 266 에 위치한 해양동물원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000202008001000&uc_seq=44&lang_cd=ko' },
    { name: '영화의전당', descreption: '부산광역시 해운대구 센텀시티에 위치한 영상복합문화공간이자 부산국제영화제 전용관', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=421&lang_cd=ko' },
  ],
  사하구: [
    { name: '감천문화마을', descreption: '부산광역시 사하구 감천동에 있는 마을이자 부산 원도심의 대표적인 랜드마크', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=365&lang_cd=ko' },
    { name: '부산현대미술관', descreption: '부산광역시민의 미술문화 체험 및 교육 기회의 확대와 현대미술분야의 진흥에 관한 사무를 분장하는 부산광역시청의 사업소', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=1671&lang_cd=ko' },
  ],
  금정구: [
    { name: '범어사', descreption: '부산광역시 금정구 청룡동 금정산에 있는 사찰', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=402&lang_cd=ko' },
    { name: '스포원파크', descreption: '실내 스포츠를 즐길 수 있는 스포츠센터를 비롯하여 풋살장, 족구장, 카트월드, 야구장, 축구장, 사이드롬(경륜장)등의 레포츠 시설과 탄생의 신비, 어린이 교통 나라, 안전체험장 등 교육시설이 결합한 새로운 테마공원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=463&lang_cd=ko' },
  ],
  강서구: [
    { name: '대저생태공원', descreption: '부산광역시에 있는 공원 및 스포츠 시설', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=1673&lang_cd=ko' },
  ],
  연제구: [
    { name: '온천천', descreption: '부산광역시의 금정산에서 발원하여 금정구, 동래구, 연제구를 거쳐 수영강으로 흘러드는 지방 하천', link: 'https://www.visitbusan.net/index.do?menuCd=DOM_000000202003001000&uc_seq=388&lang_cd=ko' },
  ],
  수영구: [
    { name: '밀락더마켓', descreption: '해운대 더베이101과 다대포의 올드트리마켓에 이어 수영구 민락동에 선보인 세 번째 복합문화공간', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201003001000&uc_seq=1323&lang_cd=ko' },
    { name: '광안리해수욕장', descreption: '부산광역시 수영구 광안2동에 위치한 해수욕장', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=377&lang_cd=ko' },
  ],
  사상구: [
    { name: '삼락생태공원', descreption: '부산광역시 사상구 삼락동에서 감전동 일부를 지나서 엄궁동까지 위치해 있는 생태공원', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=325&lang_cd=ko' },
  ],
  기장군: [
    { name: '해동용궁사', descreption: '부산광역시 기장군 기장읍 용궁길 86 (시랑리)에 위치한 사찰이며, 대한불교 조계종 제19교구 본사 화엄사의 말사', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=261&lang_cd=ko' },
    { name: '아홉산숲', descreption: '부산광역시 기장군 철마면 아홉산 자락에 위치한 숲', link: 'https://visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=260&lang_cd=ko' }
  ]
}

export default function App() {   // App 컴포넌트는 전체 애플리케이션을 구성
  return (
    <div>
      <Title />   {/* 제목 컴포넌트 */}
      <FilterableTouristTable places={PLACES} />    {/* 필터링 가능한 관광지 테이블 컴포넌트 */}
    </div>
  )
}