# Descrição
Fruit Shop é um site de *ecommerce* de frutas e afins. Escrito em ReactJS.

Nele é possível escolher entre as frutas disponíveis na página principal e adiciona-las ao carrinho, daí então "comprá-las" ou retira-las do carrinho.

O projeto é apenas um teste de habilidade e não possui todas as funcionalidades e segurança de um aplicativo de *ecommerce* real.

# Scripts

**Inicializar o projeto**

`npm run start`

**Construir a aplicação**

`npm run build`

**Postar site através do *GitHub Pages***

`npm run deploy`

# Variáveis de ambiente

**REACT_APP_API_BASE_URL**

*Link* do *host* da *api* mais o caminho `/api/fruit/`

exemplo: `http://localhost:3333/api/fruit/`

**REACT_APP_FLICKR_API_KEY**

Chave da *api* do *Flickr*

Necessária para o carregamento das imagens das frutas.

# *Misc*

## *Api* original

- `https://www.fruityvice.com/api/fruit/`
- O servidor não possui CORS, sendo impossível realizar requisições diretamente do navegador (aplicação React)
- Um servidor alternativo, em `NodeJS` e com CORS, está disponível em [FruitShopServer](https://github.com/daviprios/FruitShopServer)