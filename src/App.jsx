import { useState } from 'react'
import './App.css';

// 상품 목록을 필터링할 수 있는 컴포넌트
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');   // 검색어 입력값
  const [inStockOnly, setInStockOnly] = useState(false);  // 재고가 있는 상품만 보기 체크박스

  return (
    <div>
      <SearchBar
        filterText={filterText}   // 검색어
        inStockOnly={inStockOnly}   // 재고가 있는 상품만 보기 체크박스
        onFilterTextChange={setFilterText}    // 검색어 입력값 변경 함수
        onInStockOnlyChange={setInStockOnly}    // 재고가 있는 상품만 보기 체크박스 변경 함수
      />
      <ProductTable
        products={products}   // 상품 목록
        filterText={filterText}   // 검색어
        inStockOnly={inStockOnly}   // 재고가 있는 상품만 보기 체크박스
      />
    </div>
  );
}

// 상품 카테고리와 상품 정보를 표시하는 컴포넌트
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}    {/* 카테고리 이름 */}
      </th>
    </tr>
  );
}

// 상품 정보를 표시하는 컴포넌트
function ProductRow({ product }) {
  const name = product.stocked ? product.name :   // 재고가 없는 상품은 빨간색으로 표시
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>   {/* 상품 이름 */}
      <td>{product.price}</td>    {/* 상품 가격 */}
    </tr>
  );
}

// 상품 목록을 필터링하여 표시하는 컴포넌트
function ProductTable({ products, filterText, inStockOnly }) {    // products: 상품 목록, filterText: 검색어, inStockOnly: 재고가 있는 상품만 보기 체크박스
  const rows = [];    // 상품 목록을 저장할 배열
  let lastCategory = null;    // 마지막 카테고리

  products.forEach((product) => {   // 상품 목록을 순회
    if (product.name.toLowerCase().indexOf(
        filterText.toLowerCase()    // 상품 이름에 검색어가 포함되어 있는지 확인
      ) === -1    // 상품 이름에 검색어가 포함되어 있지 않으면
    ) {
      return;   // 상품 목록에 추가하지 않음
    }
    if (inStockOnly && !product.stocked) {    // 재고가 있는 상품만 보기 체크박스가 체크되어 있고, 재고가 없는 상품이면
      return;   // 상품 목록에 추가하지 않음
    }
    if (product.category !== lastCategory) {    // 카테고리가 마지막 카테고리와 다르면
      rows.push(    // 카테고리 이름을 추가
        <ProductCategoryRow
          category={product.category}   // 카테고리 이름
          key={product.category}    // 카테고리 이름을 key로 사용
        />
      );
    }
    rows.push(    // 상품 정보를 추가
      <ProductRow
        product={product}   // 상품 정보
        key={product.name}    // 상품 이름을 key로 사용
      />
    );
    lastCategory = product.category;    // 마지막 카테고리를 현재 카테고리로 변경
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>   {/* 상품 이름 */}
          <th>Price</th>    {/* 상품 가격 */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>   {/* 상품 목록 */}
    </table>
  );
}

// 검색어 입력창과 재고가 있는 상품만 보기 체크박스를 표시하는 컴포넌트
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)} />   {/* 검색어 입력창 */}
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />   {/* 재고가 있는 상품만 보기 체크박스 */}
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// 상품 목록
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;    // 상품 목록을 FilterableProductTable 컴포넌트에 전달
}