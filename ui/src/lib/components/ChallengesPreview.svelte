<script>
  export let challenges;
  import { readable, derived } from 'svelte/store';
  import {createTable, Subscribe, Render} from 'svelte-headless-table';
  import { addPagination } from 'svelte-headless-table/plugins';
  const data = readable(challenges)


  const table = createTable(data, {
    page: addPagination(),
  });
  const columns = table.createColumns([
    table.column({
      header: 'Id',
      accessor: 'id',
    }),
    table.column({
      header: 'Title',
      accessor: 'title',
    }),
    table.column({
      header: 'Published',
      accessor: 'isPublished',
    }),
    table.column({
      header: 'Difficulty',
      accessor: 'difficulty',
    }),
    table.column({
      header: 'Published At',
      accessor: 'publishedAt',
    })
  ]);

  const {
    headerRows,
    pageRows,
    rows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates
  } = table.createViewModel(columns);

  const { pageIndex, pageCount, hasNextPage, hasPreviousPage, pageSize } = pluginStates.page;
  pageSize.set(20);
</script>

<table {...$tableAttrs}>
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
              <th {...attrs}>
                <Render of={cell.render()} />
              </th>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </thead>
  <tbody {...$tableBodyAttrs}>
    {#each $pageRows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each row.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <td {...attrs}>
                {#if cell.id === 'id'}
                  <a class="cid" href={`/challenges/${cell.render()}`}>{cell.render()}</a>
                {:else if cell.id === 'isPublished'}
                  <Render of={cell.id === 'isPublished' && cell.render() === 0 ? 'Yes' : 'No'} />
                {:else}
                  <Render of={cell.render()} />
                {/if}
                <!-- <Render of={cell.id === 'isPublished' ? cell.render() === 0 ? 'Yes' : 'No' : cell.render()} /> -->
              </td>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </tbody>
</table>
<div>
  <button
    on:click={() => $pageIndex--}
    disabled={!$hasPreviousPage}>Previous</button
  >
  {$pageIndex + 1} out of {$pageCount}
  <button
    on:click={() => $pageIndex++}
    disabled={!$hasNextPage}>Next</button
  >
</div>

<style>
  table {
    border-spacing: 0;
    border-top: 1px solid black;
    border-left: 1px solid black;
    width: fit-content;
  }
  th,
  td {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 0.5rem;
  }

  th, td {
    text-align: left;
  }

  .cid {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: green;
  }
</style>