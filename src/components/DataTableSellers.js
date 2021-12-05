import React from "react";
import { DataTable } from "react-native-paper";

export default ({ sellers }) => {
  const [page, setPage] = React.useState(0);

  const numberOfItemsPerPage = 6;
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, sellers.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Vendedor</DataTable.Title>
        <DataTable.Title>Matrícula</DataTable.Title>
      </DataTable.Header>
      {sellers.map((s) => (
        <DataTable.Row key={s.id}>
          <DataTable.Cell>{s.name}</DataTable.Cell>
          <DataTable.Cell numeric>{s.registration}</DataTable.Cell>
        </DataTable.Row>
      ))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(sellers.length / numberOfItemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} de ${sellers.length}`}
        showFastPaginationControls
        numberOfItemsPerPage={numberOfItemsPerPage}
        selectPageDropdownLabel={"Vendedores por pagina"}
      />
    </DataTable>
  );
};
