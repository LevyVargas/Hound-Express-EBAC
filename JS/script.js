let listGuides = [["1", "Guadalajara", "Monterrey", "Roberto Gomez", "2025-10-30", "Pendiente"], ["2", "Guadalajara", "Monterrey", "Roberto Gomez", "2025-10-30", "Pendiente"]];
const storedGuides = sessionStorage.getItem("guides");
const deliveryCard = document.querySelectorAll(".summary__text");

if (storedGuides) {
    listGuides = JSON.parse(storedGuides);
}  

function newGuide() {
    const data = document.querySelectorAll(".register__input");
    const newGuideData = [];
    let compareGuide = "";
    let isDuplicate = false;
    let isFormValid = true;

    data.forEach((item, index) => {
        const itemValue = item.value.trim();
        if(itemValue === "") {
            console.log("Complete todos los campos");
            isFormValid = false;
            
        } 
        if(isFormValid) {
            if (index === 0) {
            compareGuide = itemValue;
            }
            newGuideData.push(itemValue);
            // console.log(`El valor del campo ${index + 1} es: ${itemValue}`);
        }
    });

    if (!isFormValid) {
        console.log("Debe llenar todos los campos");
        return; 
    }

    for(const existingGuide of listGuides) {              
        if (existingGuide[0] === compareGuide) { 
            isDuplicate = true;
            console.log(`El número de guía es: ${existingGuide[0]} y el del nuevo  ${compareGuide}, por lo tanto no es valido`);
            break;
        }
    }

    if (!isDuplicate) {
        console.log(`El número de guía es: ${compareGuide}, por lo tanto es valido`);
        const estadoInicial = newGuideData[5] || 'Pendiente';
        const confirmMsg = `Crear guía ${compareGuide}?\nOrigen: ${newGuideData[1] || 'N/A'}\nDestino: ${newGuideData[2] || 'N/A'}\nEstado: ${estadoInicial}`;
        if (!window.confirm(confirmMsg)) {
            console.log('Creación de guía cancelada por el usuario');
            return;
        }
        listGuides.push(newGuideData);
        sessionStorage.setItem("guides", JSON.stringify(listGuides));
        const historyRaw = sessionStorage.getItem('guideHistory') || '{}';
        const historyObj = JSON.parse(historyRaw);
        historyObj[String(compareGuide)] = historyObj[String(compareGuide)] || [];
        historyObj[String(compareGuide)].push({
            estado: estadoInicial,
            fecha: new Date().toLocaleString(),
            descripcion: 'Creación de la guía'
        });
        sessionStorage.setItem('guideHistory', JSON.stringify(historyObj));
        // localStorage.setItem("guides", JSON.stringify(listGuides));
    }
    
    console.log(`Lista de guias ${listGuides}`);
}

const saveButton = document.querySelector(".save");
if (saveButton) {
    saveButton.addEventListener("click", newGuide);
}

const changeButton = document.querySelector(".change");
const pendingChanges = {};

if (changeButton) {
    changeButton.addEventListener("click", () => {
        const tableBodyCheck = document.querySelector('.table__body');
        if (tableBodyCheck) {
            const keys = Object.keys(pendingChanges);
            if (keys.length === 0) {
                alert('Cambios guardados correctamente.');
                return;
            }
            keys.forEach(k => {
                const guide = listGuides.find(g => g[0] === k);
                if (guide) {
                    const prevState = guide[5];
                    guide[5] = pendingChanges[k];
                    const historyRaw = sessionStorage.getItem('guideHistory') || '{}';
                    const historyObj = JSON.parse(historyRaw);
                    historyObj[String(k)] = historyObj[String(k)] || [];
                    historyObj[String(k)].push({
                        estado: guide[5],
                        fecha: new Date().toLocaleString(),
                        descripcion: `Cambio de "${prevState}" a "${guide[5]}"`
                    });
                    sessionStorage.setItem('guideHistory', JSON.stringify(historyObj));
                }
            });
            sessionStorage.setItem('guides', JSON.stringify(listGuides));
            for (const k of keys) delete pendingChanges[k];
            alert('Cambios guardados correctamente.');
        } else {
            newGuide();
        }
    });
} else {
    console.log('La clase .button__style no existe');
}

const tableData = document.querySelector(".table__body");
if (tableData) {
    listGuides.forEach(guide => {
        const tableRow = document.createElement("tr");
        tableRow.className = "table__row";
        guide.forEach(dataItem => {
            const tableCell = document.createElement("td");
            tableCell.textContent = dataItem;
            tableRow.append(tableCell);
        });

        const tableCell = document.createElement("td");
        const divCell = document.createElement("div");
        divCell.className = "table__cell-actions";

        const btnChangeRow = document.createElement("button");
        btnChangeRow.textContent = "Cambiar";
        btnChangeRow.className = "btn-guide-action";

        const btnHistoryRow = document.createElement("button");
        btnHistoryRow.textContent = "Historial";
        btnHistoryRow.className = "btn-guide-action";

        tableCell.append(divCell);
        divCell.append(btnChangeRow);
        divCell.append(btnHistoryRow);
        tableRow.append(tableCell);
        tableData.append(tableRow);
    });
} else {
    console.log('La clase .table__body no existe');
}


function createModal() {
    if (document.getElementById('statusModal')) return;

    const modal = document.createElement('div');
    modal.id = 'statusModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'none';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    const dialog = document.createElement('div');
    dialog.style.background = '#fff';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '6px';
    dialog.style.minWidth = '300px';

    dialog.innerHTML = `
        <h3>Seleccionar estado</h3>
        <form id="statusForm">
            <label><input type="radio" name="status" value="Pendiente"> Pendiente</label><br>
            <label><input type="radio" name="status" value="En tránsito"> En tránsito</label><br>
            <label><input type="radio" name="status" value="Entregado"> Entregado</label>
            <div style="margin-top:12px; text-align:right;">
                <button type="button" id="statusCancel">Cancelar</button>
                <button type="button" id="statusApply" style="margin-left:8px;">Aplicar</button>
            </div>
        </form>
    `;

    modal.appendChild(dialog);
    document.body.appendChild(modal);

    modal.querySelector('#statusCancel').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

function createHistoryModal() {
    if (document.getElementById('historyModal')) return;

    const modal = document.createElement('div');
    modal.id = 'historyModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'none';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    const dialog = document.createElement('div');
    dialog.style.background = '#fff';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '6px';
    dialog.style.minWidth = '320px';
    dialog.style.maxWidth = '90%';
    dialog.style.maxHeight = '80%';
    dialog.style.overflowY = 'auto';

    dialog.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
        <button type="button" id="historyClose" aria-label="Cerrar" style="background:none;border:none;font-size:18px;cursor:pointer;">&times;</button>
            <h3 style="margin:0;">Historial de la guía</h3>
        </div>
        <div id="historyContent" style="margin-top:12px; white-space:pre-wrap;"></div>
    `;

    modal.appendChild(dialog);
    document.body.appendChild(modal);

    modal.querySelector('#historyClose').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (ev) => {
        if (ev.target === modal) modal.style.display = 'none';
    });
}

function openHistoryModal(guideNumber) {
    createHistoryModal();
    const modal = document.getElementById('historyModal');
    if (!modal) return;

    const historyRaw = sessionStorage.getItem('guideHistory');
    const parsed = historyRaw ? JSON.parse(historyRaw) : null;
    const entries = parsed && parsed[guideNumber];

    const contentNode = modal.querySelector('#historyContent');
    if (!contentNode) return;

    if (!entries || entries.length === 0) {
        contentNode.textContent = 'No hay historial para la guía ' + guideNumber;
    } else {
        const listHtml = entries.map((it, idx) => {
            return `<div style="margin-bottom:8px;">
                        <strong>${idx + 1}. ${it.estado}</strong><br>
                        <small>${it.fecha}</small><br>
                        <span>${it.descripcion}</span>
                    </div>`;
        }).join('');
        contentNode.innerHTML = listHtml;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModals() {
    const statusModal = document.getElementById('statusModal');
    const historyModal = document.getElementById('historyModal');
    if (statusModal) {
        statusModal.classList.remove('is-open');
        statusModal.setAttribute('aria-hidden', 'true');
    }
    if (historyModal) {
        historyModal.classList.remove('is-open');
        historyModal.setAttribute('aria-hidden', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table__body');
    if (tableBody) {
        Array.from(tableBody.querySelectorAll('tr')).forEach(row => {
            const cells = row.querySelectorAll('td');
            const guideNumber = cells[0] ? cells[0].textContent.trim() : null;
            if (!guideNumber) return;
            const actionCell = row.querySelector('.table__cell-actions');
            if (!actionCell) return;
            const btns = actionCell.querySelectorAll('button');
            if (btns[0]) btns[0].addEventListener('click', () => openStatusModal(guideNumber, row));
            if (btns[1]) btns[1].addEventListener('click', () => openHistoryModal(guideNumber));
        });
    }

    document.addEventListener('click', (ev) => {
        const statusModal = document.getElementById('statusModal');
        const historyModal = document.getElementById('historyModal');
        if (ev.target && (ev.target.id === 'statusCancel' || ev.target.classList.contains('modal__close') || ev.target.id === 'historyClose')) {
            closeModals();
        }
    });

    const statusModalEl = document.getElementById('statusModal');
    if (statusModalEl) statusModalEl.addEventListener('click', (ev) => { if (ev.target === statusModalEl) closeModals(); });
    const historyModalEl = document.getElementById('historyModal');
    if (historyModalEl) historyModalEl.addEventListener('click', (ev) => { if (ev.target === historyModalEl) closeModals(); });

    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeModals(); });
});

function pendingGuides(guidesList) {
    const activeGuides = guidesList.filter(guide => {
        return guide[5] === "Pendiente"; 
    });
    return activeGuides.length;
}
const totalPendientes = pendingGuides(listGuides);
// console.log(`El número de guías pendientes es: ${totalPendientes}`);

function transitGuides(guidesList) {
    const activeGuides = guidesList.filter(guide => {
        return guide[5] === "En tránsito"; 
    });
    return activeGuides.length;
}
const totalEnTransito = transitGuides(listGuides);
// console.log(`El número de guías en tránsito es: ${totalEnTransito}`);

function deliveredGuides(guidesList) {
    const activeGuides = guidesList.filter(guide => {
        return guide[5] === "Entregado"; 
    });
    return activeGuides.length;
}
const totalEntregadas = deliveredGuides(listGuides);
// console.log(`El número de guías entregadas es: ${totalEntregadas}`)

const summaryNodes = document.querySelectorAll('.summary__text');       
if (summaryNodes && summaryNodes.length > 0) {
    if (summaryNodes[0]) summaryNodes[0].textContent = String(totalPendientes || 0);
    if (summaryNodes[1]) summaryNodes[1].textContent = String(totalEnTransito || 0);
    if (summaryNodes[2]) summaryNodes[2].textContent = String(totalEntregadas || 0);
} else {
    console.log('La clase .summary__text no existe');
}

function openStatusModal(guideNumber, row) {
    createModal();
    const modal = document.getElementById('statusModal');
    if (!modal) return;

    const form = modal.querySelector('#statusForm');
    const estadoCell = row.children[5];
    const currentEstado = estadoCell ? estadoCell.textContent.trim() : '';

    if (form) {
        const radios = form.querySelectorAll('input[name="status"]');
        radios.forEach(r => r.checked = (r.value === currentEstado));
    }

    const applyBtn = modal.querySelector('#statusApply');
    const cancelBtn = modal.querySelector('#statusCancel');

    function onApply(e) {
        e && e.preventDefault();
        const selected = modal.querySelector('input[name="status"]:checked');
        if (!selected) return;
        const newEstado = selected.value;

        const order = ['Pendiente', 'En tránsito', 'Entregado'];
        const currentIndex = order.indexOf(currentEstado);
        const newIndex = order.indexOf(newEstado);
        if (newIndex < 0) return;
        if (newIndex < currentIndex) {
            alert('No se permite cambiar a un estado anterior.');
            return;
        }

        if (estadoCell) estadoCell.textContent = newEstado;
        const guidesRaw = sessionStorage.getItem('guides');
        const guides = guidesRaw ? JSON.parse(guidesRaw) : listGuides;
        const idx = guides.findIndex(g => g[0] === guideNumber);
        if (idx !== -1) guides[idx][5] = newEstado;
        sessionStorage.setItem('guides', JSON.stringify(guides));
        const historyRaw = sessionStorage.getItem('guideHistory') || '{}';
        const historyObj = JSON.parse(historyRaw);
        historyObj[String(guideNumber)] = historyObj[String(guideNumber)] || [];
        historyObj[String(guideNumber)].push({ estado: newEstado, fecha: new Date().toLocaleString(), descripcion: 'Cambio desde modal' });
        sessionStorage.setItem('guideHistory', JSON.stringify(historyObj));

        if (typeof updateSummary === 'function') updateSummary();

        closeModals();
    }

    applyBtn.onclick = onApply;
    if (cancelBtn) cancelBtn.onclick = (e) => { e && e.preventDefault(); closeModals(); };

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
}