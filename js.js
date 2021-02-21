function showDropMenu(element) {
    element.getElementsByTagName('ul')[0].style.display = 'block'
}

function hideDropMenu(element) {
    element.getElementsByTagName('ul')[0].style.display = 'none'
}

for (let i = 1; i <= 12; i++) {
    dragElement(document.getElementById(("item-" + i)));
}

let old_el = ''
let renamed = false

function dragElement(elem) {
    let mouseDown = false;
    elem.onmousedown = () => {
        mouseDown = true
    }
    elem.onmouseup = (event) => {
        elem.getElementsByClassName('item-content')[0].style.position = 'static';
        old_el = elem
        mouseDown = false
    }
    elem.onmouseover = (event) => {
        if (!mouseDown && old_el !== '' && !renamed) {
            let second_content = elem.innerHTML
            let second_id = elem.id
            let old_content = old_el.innerHTML
            let old_id = old_el.id
            elem.innerHTML = old_content
            elem.id = old_id
            old_el.innerHTML = second_content
            old_el.id = second_id
            old_el = ''
        } else if (renamed) {
            old_el = ''
            mouseDown = false
            renamed = false
        }
    }
    elem.onmousemove = (event) => {
        if (mouseDown) {
            elem.getElementsByClassName('item-content')[0].style.position = 'absolute';
            elem.getElementsByClassName('item-content')[0].style.top = (event.pageY - 10) + "px";
            elem.getElementsByClassName('item-content')[0].style.left = (event.pageX - 85) + "px";
        }
    }
}


async function nameEdit(elem) {
    renamed = true
    let data = {
        name: prompt('Введите новое имя товара'),
        id: elem.parentNode.parentNode.id
    }
    if (data.name !== '' && data.name !== null) {
        elem.innerText = data.name
        var response = await fetch('http://test', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 200) {
            // success
        } else {
            // error
        }
    }
}
