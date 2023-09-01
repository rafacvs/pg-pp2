
# Projeto Parcial 2 - Processamento gráfico



## Descrição

O projeto se resume a 2 objetos dispostos em uma cena: Uma banana e um cilidro. Ambos possuem animações e estão posicionados girando no espaço.

A banana foi construída apartir da classe TorusBufferGeometry. Após sua construção, foi aplicado uma textura de banana, caracterizando-a.

O Cilindro consiste em um objeto sólido geométrico, no qual foi aplicado um shader personalizado, o qual aplica um gradiente sobre o objeto.

Na cena, é possível alternar entre as câmeras utilizando as teclas '1', '2' ou '3'. Todas as câmeras são estáticas.

Na cena, apesar de os objetos estarem animados, é possível pará-los utilizando a tecla espaço.
## Rodando o projeto localmente

Para rodar o projeto localmente, primeiro instale o NodeJS.

Após ter o NodeJS instalado, clone o repositório e rode o seguinte comando na pasta raíz do projeto:
```
npx serve .
```
## Controles

| Tecla     | Ação                    |
| --------- | ----------------------- |
| Space     | Pausar/Resumir animação |
| 1         | Utilizar câmera 1       |
| 2         | Utilizar câmera 2       |
| 3         | Utilizar câmera 3       |
