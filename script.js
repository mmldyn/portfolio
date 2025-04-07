/*TIME*/

function updateTime() {
        let now = new Date();
        let time = new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(now);

        document.getElementById("time").innerText = time;
    }

    updateTime(); 
    setInterval(updateTime, 1000);

/*MAIN*/

window.addEventListener("scroll", function () {
    let scrollPos = window.scrollY;
    let blurAmount = Math.min(scrollPos / 20, 10); 
    document.getElementById("title").style.filter = `blur(${blurAmount}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
    let textElement = document.querySelector(".main h1");
    let text = "MAULIDIYAN"; 
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text[index];
            index++;
            setTimeout(typeWriter, 200); 
        } else {
            textElement.style.borderRight = "none"; 
        }
    }

    textElement.textContent = "";
    setTimeout(typeWriter, 500);
});

/*transisi*/

document.addEventListener("DOMContentLoaded", function () {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.5 });

    hiddenElements.forEach(el => observer.observe(el));
});

/*fotoku*/

const foto = document.getElementById("fotoku");

let xAxis = 0;
let yAxis = 0;
let currentX = 0;
let currentY = 0;
let isAnimating = false;
let isMouseOver = false;

foto.addEventListener("mousemove", (e) => {
    isMouseOver = true;

    let rect = foto.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;

    xAxis = (centerX - e.clientX) / 20; 
    yAxis = (centerY - e.clientY) / 20;

    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
});

foto.addEventListener("mouseleave", () => {
    isMouseOver = false;
    
    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
});

function animate() {
    currentX += (xAxis - currentX) * 0.1;
    currentY += (yAxis - currentY) * 0.1;

    foto.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg) scale(${isMouseOver ? 1.05 : 1})`;

    if (Math.abs(currentX - xAxis) > 0.1 || Math.abs(currentY - yAxis) > 0.1 || !isMouseOver) {
        requestAnimationFrame(animate);
    } else {
        isAnimating = false;
    }
}