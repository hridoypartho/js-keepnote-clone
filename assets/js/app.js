const addButton = document.querySelector('.button__content_btn');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
};



const addNewnote = ( text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
    <div class="note__content">
    <div class="note__content_textarea">
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea cols="30" rows="10" class="${text ? "hidden" : ""}" ></textarea>
    </div>
    <div class="note__content_button">
        <div class="d-flex align-items-center">
            <a href="javascript:void(0)" class="edit"><i class="fas fa-edit"></i></a>
            <a href="javascript:void(0)" class="delete"><i class="fas fa-trash-alt"></i></a>
        </div>
    </div>
</div>
    `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    
    const  editButton =  note.querySelector('.edit');
    const  delButton =  note.querySelector('.delete');
    const  mainDiv =  note.querySelector('.main');
    const  textArea =  note.querySelector('textarea');
    delButton.addEventListener('click', () =>{
        note.remove();
    });

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () =>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden')
    });

    textArea.addEventListener('change', (event) =>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })


    document.body.appendChild(note)


}

//gating data back form localdtorage
const notes = JSON.parse(localStorage.getItem('notes'));


if(notes){
    notes.forEach((note) => addNewnote(note))
}

addButton.addEventListener('click', () => addNewnote() );