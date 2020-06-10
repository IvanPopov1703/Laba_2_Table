'use strict'

let d = document
let selectedColumn = -1;
let motoTable = d.getElementById('motorcycleTable');
let formAdd = d.getElementById('addMotorcycle');

//Функция для добавления новой строки в таблицу
function addRow() {
    //Считываем значение с формы
    let inputModel = d.getElementById('inputModel');
    let inputPower = d.getElementById('inputPower');
    let inputVolume = d.getElementById('inputVolume');
    let inputCost = d.getElementById('inputCost');

    //Находим таблицу, в которую будем добовлять
    let tableAdd = motoTable.getElementsByTagName('tbody')[0];

    //Создаем строку таблицы и добовляем её в конец
    let row = d.createElement("TR");
    tableAdd.appendChild(row);

    //Создаём ячейки в вышесозданной строке и добовляем их
    let td1 = d.createElement("TD");
    let td2 = d.createElement("TD");
    let td3 = d.createElement("TD");
    let td4 = d.createElement("TD");
    let td5 = d.createElement("TD");

    //Добавляем их в строку
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    let delButton = d.createElement('button'); //Создааём кнопку удалить
    let textBtn = d.createTextNode('Удалить'); //Создаём текст для кнопки
    delButton.appendChild(textBtn); //Записываем текст на кнопку
    delButton.style.cssText = "margin-left: 10px; margin-top: 13px;" //Добавляем стили дял кнопки
    row.appendChild(delButton);

    //Заполняем ячейки инфой
    td1.innerHTML = inputModel.value;
    td2.innerHTML = inputPower.value;
    td3.innerHTML = inputVolume.value;
    td4.innerHTML = inputCost.value;
}

//Сортировка таблицы
function sortMotoTable(index, dataType, tableIsSorted) {
    const tbody = motoTable.querySelector('tbody');

    function compareRows(firstRow, secondRow) {
        const dataFirstRow = firstRow.cells[index].innerHTML;
        const dataSecondRow = secondRow.cells[index].innerHTML;
        switch (dataType) {
            case 'text': {
                if (dataFirstRow < dataSecondRow)
                    return -1;
                if (dataFirstRow > dataSecondRow)
                    return 1;
                return 0;
            }
            case 'integer': {
                return dataFirstRow - dataSecondRow;
            }
        }
    }

    let rows = [].slice.call(tbody.rows);
    rows.sort(compareRows);
    if (tableIsSorted)
        rows.reverse();

    motoTable.removeChild(tbody);
    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }
    motoTable.appendChild(tbody);
}

//Клик на кнопку добавить
formAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    addRow();
});

//Функция для удаления и сортировки
motoTable.addEventListener('click', (e) => {

    //Удаление
    if (e.target.tagName === "BUTTON") {
        let rowIndex = e.target.closest('TR').rowIndex;
        motoTable.deleteRow(rowIndex);
    }

    //Сортировка
    if (e.target.tagName === 'TH') {
        let currentIndex = e.target.cellIndex;
        sortMotoTable(currentIndex, e.target.getAttribute('data-type'), selectedColumn === currentIndex);
        if (selectedColumn === currentIndex) {
            selectedColumn = -1;
        } else {
            selectedColumn = currentIndex;
        }
    }
});