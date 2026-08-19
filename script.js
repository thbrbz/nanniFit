let produtos = null

async function inciarSistema() {
  try {
    const resposta = await fetch('produtos.json')
    produtos = await resposta.json()

    renderizarMenu()
  } catch (erro) {
    console.error('Erro ao carregar os dados de produtos:', erro)
  }
}

function renderizarMenu() {
  const categorias = [...new Set(produtos.map((produto) => produto.categoria))]

  const renderizarColuna = (listaCategorias) => {
    return `
      <section class="menu-column column">
        ${listaCategorias
          .map((categoria) => {
            const produtosPorCategoria = produtos.filter(
              (produto) => produto.categoria === categoria
            )

            return `
            <div class="category">
              <h2 class="category-title">${categoria}</h2>

              ${produtosPorCategoria
                .map((produto) => {
                  return `
                  <div class="item menu-item">
                    <div class="item-header">
                      <span class="item-name">${produto.nome}</span>
                      <span class="item-price"><span class="currency">R$</span> ${produto.preco}</span>
                    </div>
                    <p class="item-desc">${produto.descricao ? produto.descricao : ''}</p>

                    ${
                      produto.adicional && produto.adicional.length > 0
                        ? produto.adicional
                            .map((adicional) => {
                              return `
                            <p class="item-desc">
                              + ${adicional.nome} <span style="margin-left: 5px; font-size: 9px;">R$ </span>
                              ${adicional.preco}
                            </p>
                          `
                            })
                            .join('')
                        : ''
                    }
                  </div>
                `
                })
                .join('')}
            </div>
          `
          })
          .join('')}
      </section>
    `
  }

  const metade = Math.ceil(categorias.length / 2)
  const coluna1Categorias = categorias.slice(0, metade)
  const coluna2Categorias = categorias.slice(metade)

  let menu = document.querySelector('.menu-container')

  menu.innerHTML =
    renderizarColuna(coluna1Categorias) + renderizarColuna(coluna2Categorias)
}

inciarSistema()
