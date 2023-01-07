const carousel = document.querySelector('.carousel'),
firstImg = carousel.querySelectorAll('img')[0],
arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false, prevPageX, isDragging = false, prevScrollLeft, positionDiff;

const showHiddenIcons = () => { 
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block';
}


arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHiddenIcons(), 60)
    })
})

const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
    
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = a => {
    isDragStart = true;
    prevPageX = a.pageX || a.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = a => {
    if(!isDragStart) return;
    a.preventDefault();
    isDragging = true;
    carousel.classList.add('dragging'); 
    positionDiff = (a.pageX || a.touches[0].pageX)- prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHiddenIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('touchend', dragStop);
