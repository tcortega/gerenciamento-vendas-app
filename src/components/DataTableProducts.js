import React from "react";
import { DataTable } from "react-native-paper";

export default ({ products }) => {
  const [page, setPage] = React.useState(0);

  const numberOfItemsPerPage = 6;
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, products.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Produto</DataTable.Title>
        <DataTable.Title numeric>Quantidade</DataTable.Title>
        <DataTable.Title numeric>Preço</DataTable.Title>
      </DataTable.Header>
      {products.map((p) => (
        <DataTable.Row key={p.id}>
          <DataTable.Cell>{p.name}</DataTable.Cell>
          <DataTable.Cell numeric>{p.quantity}</DataTable.Cell>
          <DataTable.Cell numeric>{p.price}</DataTable.Cell>
        </DataTable.Row>
      ))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(products.length / numberOfItemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} de ${products.length}`}
        showFastPaginationControls
        numberOfItemsPerPage={numberOfItemsPerPage}
        selectPageDropdownLabel={"Produtos por pagina"}
      />
    </DataTable>
  );
};
