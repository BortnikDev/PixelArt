// Variavel
const buttonRandom = document.getElementById('button-random-color');
const getColor = document.getElementsByClassName('color');
const getColorBlack = document.getElementsByClassName('color')[0];
// console.log(getColorBlack);
// funçoes
const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const paint = () => {
  const valorStorage = [];
  for (let index = 0; index < getColor.length; index += 1) {
    if (index === 0) {
      getColor[0].style.backgroundColor = 'black';
    } else {
      getColor[index].style.backgroundColor = randomColor();
      valorStorage.push(getColor[index].style.backgroundColor);
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(valorStorage));
  // console.log(valorStorage)
};

buttonRandom.addEventListener('click', paint);

const loadStorage = () => {
  const saveStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < getColor.length; index += 1) {
    if (index === 0) {
      getColor[index].style.backgroundColor = 'black';
    }
    getColor[index].style.backgroundColor = saveStorage[index - 1];
  }
};

const quadro = () => {
  const matriz = document.getElementById('pixel-board');
  for (let index1 = 0; index1 < 5; index1 += 1) {
    const linha1 = document.createElement('div');
    matriz.appendChild(linha1);
    linha1.className = 'linha1';
    for (let index2 = 0; index2 < 5; index2 += 1) {
      const linha2 = document.createElement('div');
      linha1.appendChild(linha2);
      linha2.className = 'pixel';
    }
  }
};

const selectColor = () => {
  for (let index = 0; index < getColor.length; index += 1) {
    getColor[index].addEventListener('click', () => {
      const selecionado = document.getElementsByClassName('selected')[0];
      selecionado.classList.remove('selected');
      getColor[index].classList.add('selected');
    });
  }
};

const savePixelLocalStorage = () => {
  const savePixelBgColor = [];
  const pixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    savePixelBgColor.push(pixel[index].style.backgroundColor);
    localStorage.setItem('pixelBoard', JSON.stringify(savePixelBgColor));
  }
};

const loadPixelLocalStorage = () => {
  const pixel = document.getElementsByClassName('pixel');
  const loadStoragePixel = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = loadStoragePixel[index];
  }
};

const paintPixel = () => {
  const pixel = document.getElementsByClassName('pixel');
  if (localStorage.getItem('pixelBoard') !== null) {
    loadPixelLocalStorage();
  }
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].addEventListener('click', () => {
      const select = document.getElementsByClassName('selected')[0];
      pixel[index].style.backgroundColor = select.style.backgroundColor;
      savePixelLocalStorage();
    });
  }
};

const clear = () => {
  const buttonClearBoard = document.getElementById('clear-board');
  const pixel = document.getElementsByClassName('pixel');
  buttonClearBoard.addEventListener('click', () => {
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = 'white';
    }
  });
};

const tamanhoDoQuadro = () => {
  const matriz = document.getElementById('pixel-board');
  const botaoVqv = document.getElementById('generate-board');
  botaoVqv.addEventListener('click', () => {
    let imputQuadro = document.getElementById('board-size').value;
    console.log(imputQuadro);
    if (!imputQuadro) {
      alert('Board inválido!');
    } if (imputQuadro < 5) {
      imputQuadro = 5;
    } if (imputQuadro > 50) {
      imputQuadro = 50;
    }
    matriz.innerHTML = '';
    for (let index1 = 0; index1 < imputQuadro; index1 += 1) {
      const linha1 = document.createElement('div');
      matriz.appendChild(linha1);
      linha1.className = 'linha1';
      for (let index2 = 0; index2 < imputQuadro; index2 += 1) {
        const linha2 = document.createElement('div');
        linha1.appendChild(linha2);
        linha2.className = 'pixel';
      }
    }
    paintPixel();
  });
};

window.onload = () => {
  if (localStorage.getItem('colorPalette') === null) {
    paint();
  } else {
    loadStorage();
  }

  quadro();
  getColorBlack.classList.add('selected');
  selectColor();
  paintPixel();
  clear();
  tamanhoDoQuadro();
};
