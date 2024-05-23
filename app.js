document.addEventListener('DOMContentLoaded', () => {
    const modelButtons = document.querySelectorAll('#model-selector button');
    const dynamicModel = document.querySelector('#dynamic-model');

    modelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modelUrl = button.getAttribute('data-model');
            dynamicModel.setAttribute('gltf-model', `url(${modelUrl})`);
        });
    });

    console.log('AR Scene Loaded');
});
// Cargar el modelo 3D
const model = document.querySelector('#dynamic-model');

// Función para actualizar la transformación del modelo
function updateModelTransform() {
    const x = document.getElementById('x-slider').value;
    const y = document.getElementById('y-slider').value;
    const z = document.getElementById('z-slider').value;
    const rotation = document.getElementById('rotate-slider').value;
    const scale = document.getElementById('scale-slider').value;

    // Aplicar la posición, rotación y escala al modelo
    model.setAttribute('position', `${x} ${y} ${z}`);
    model.setAttribute('rotation', `0 ${rotation} 0`);
    model.setAttribute('scale', `${scale} ${scale} ${scale}`);
}

document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('a-scene');
    const ambientLight = document.getElementById('ambientLight');
    const directionalColorPicker = document.getElementById('directionalColor');
    const directionalIntensitySlider = document.getElementById('directionalIntensity');
    const addDirectionalLightButton = document.getElementById('addDirectionalLight');
    const removeDirectionalLightButton = document.getElementById('removeDirectionalLight');
    const backgroundAlphaSlider = document.getElementById('backgroundAlpha');
    const backgroundColorPicker = document.getElementById('backgroundColor');
    const sky = document.getElementById('sky');

    addDirectionalLightButton.addEventListener('click', addDirectionalLight);
    removeDirectionalLightButton.addEventListener('click', removeDirectionalLight);

    function addDirectionalLight() {
        const directionalLight = document.createElement('a-light');
        directionalLight.setAttribute('type', 'directional');
        directionalLight.setAttribute('color', '#ffffff');
        directionalLight.setAttribute('intensity', '0.6');
        directionalLight.setAttribute('position', '1 1 1');
        directionalLight.id = `directionalLight${Date.now()}`; // Unique ID
        scene.appendChild(directionalLight);
    }

    function removeDirectionalLight() {
        const directionalLights = scene.querySelectorAll('a-light[type="directional"]');
        if (directionalLights.length > 0) {
            const lastDirectionalLight = directionalLights[directionalLights.length - 1];
            lastDirectionalLight.parentNode.removeChild(lastDirectionalLight);
        }
    }

    // Agregar eventos para actualizar el color de fondo y su opacidad
    backgroundColorPicker.addEventListener('input', updateSkyColor);
    backgroundAlphaSlider.addEventListener('input', updateSkyColor);

    function updateSkyColor() {
        const color = backgroundColorPicker.value;
        const alpha = backgroundAlphaSlider.value;
        sky.setAttribute('color', color);
        sky.setAttribute('material', `shader: flat; opacity: ${alpha}`);
    }

    // Agregar eventos para actualizar la intensidad de la luz direccional
    directionalIntensitySlider.addEventListener('input', (event) => {
        const directionalLights = scene.querySelectorAll('a-light[type="directional"]');
        directionalLights.forEach(light => {
            light.setAttribute('intensity', event.target.value);
        });
    });

    // Agregar eventos para actualizar el color de la luz direccional
    directionalColorPicker.addEventListener('input', (event) => {
        const directionalLights = scene.querySelectorAll('a-light[type="directional"]');
        directionalLights.forEach(light => {
            light.setAttribute('color', event.target.value);
        });
    });

    // Agregar eventos para actualizar la intensidad de la luz ambiental
    document.getElementById('ambientIntensity').addEventListener('input', (event) => {
        ambientLight.setAttribute('intensity', event.target.value);
    });

    // Agregar eventos para actualizar el color de la luz ambiental
    document.getElementById('ambientColor').addEventListener('input', (event) => {
        ambientLight.setAttribute('color', event.target.value);
    });
});


// JavaScript code here
const sliderContainer = document.getElementById('sliderContainer');
const scene = document.querySelector('a-scene');
const sky = document.getElementById('sky');
const shaderToggle = document.createElement('input');
shaderToggle.type = 'checkbox';
shaderToggle.id = 'shaderToggle';
sliderContainer.appendChild(shaderToggle);

shaderToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        applyShaders();
    } else {
        removeShaders();
    }
});

function applyShaders() {
    sky.setAttribute('material', 'shader', 'standard');
    sky.setAttribute('material', 'vertexShader', '#vertexShader');
    sky.setAttribute('material', 'fragmentShader', '#fragmentShader');
}

function removeShaders() {
    sky.removeAttribute('material', 'shader');
    sky.removeAttribute('material', 'vertexShader');
    sky.removeAttribute('material', 'fragmentShader');
}
