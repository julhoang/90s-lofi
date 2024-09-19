const textList = [
    "Welcome to my dream city!",
    "Tall buildings that touch the clouds and shine bright.",
    "Green spaces everywhere, perfect for a stroll or a picnic.",
    "Spotless streets that make you want to explore every corner.",
    "Bustling markets full of life, color, and cool stuff.",
    "Finally, Tech that's smart and eco-friendly.",
];

const colors = [
    "#0B6E4F", // Dark Green
    "#3357FF", // Bright Blue
    "#FF33A6", // Hot Pink
    "#FFD133", // Warm Yellow
    "#FF5733", // Coral
    "#33A6FF", // Sky Blue
    "#8D33FF", // Purple
    "#FF33FF", // Magenta
    "#FF3380", // Reddish Pink
    "#FF7D33", // Pumpkin Orange
    "#FF33CC", // Bright Pink
];

const container = document.getElementById("text-container");

function getRandomPosition() {
    const x = Math.random() * (container.offsetWidth - 200);
    const y = Math.random() * (container.offsetHeight - 100);
    return { x, y };
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function getRandomFontSize() {
    const minSize = 20;
    const maxSize = 32;
    return Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
}

function typeWriterEffect(text, element, delay = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    type();
}

function displayText(index) {
    if (index >= textList.length) return;

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.style.color = getRandomColor();
    textElement.style.fontSize = `${getRandomFontSize()}px`;
    container.appendChild(textElement);

    const { x, y } = getRandomPosition();
    textElement.style.left = `${x}px`;
    textElement.style.top = `${y}px`;

    typeWriterEffect(textList[index], textElement);

    setTimeout(() => {
        displayText(index + 1);
    }, textList[index].length * 100 + 200); // Adjust timing to match typing speed
}

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            displayText(0);
            observer.disconnect(); // Disconnect observer after triggering animation
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Use the viewport as the root
    threshold: 0.7, // Trigger when 70% of the section is visible
});

observer.observe(container);

// -------------------------------

const birdContainer = document.querySelector("#bird-container");
const birdContainer2 = document.querySelector("#bird-container-2");
const toggleButton = document.getElementById("toggle-button");

let isPaused = false;

toggleButton.addEventListener("click", () => {
    if (isPaused) {
        birdContainer.style.animationPlayState = "running";
        birdContainer2.style.animationPlayState = "running";
        toggleButton.textContent = "Pause the birds!";
    } else {
        birdContainer.style.animationPlayState = "paused";
        birdContainer2.style.animationPlayState = "paused";
        toggleButton.textContent = "Start the birds!";
    }
    isPaused = !isPaused;
});

// -------------------------------

const spotlightEl = document.querySelector("#spotlight");

function handleMouseMove(event) {
    const { clientX, clientY } = event;

    spotlightEl.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000ee 350px)`;
}

document.addEventListener("mousemove", handleMouseMove);
