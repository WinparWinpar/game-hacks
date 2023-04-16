class ModMenuCD {
    constructor() {
        this.cssURL = 'https://raw.githubusercontent.com/WinparWinpar/game-hacks/main/Chrome%20Dino/ModMenuCD/styles/ModMenuCD.css';
        this.xhr = new XMLHttpRequest();

        this.xhr.open('GET', this.cssURL, true);
        this.xhr.onload = function() {
            if (this.xhr.status === 200) {
                this.css = this.xhr.responseText;
            }
        };
        this.xhr.send();

        this.style = `${document.getElementById('html').style}
        ${this.css}
        `;
        this.modMenu = document.createElement('div');
        this.modMenu.id = 'modmenu';
        this.modMenu.innerHTML = `
            <div>
                <h1>ModMenuCD</h1>
                <div id="hax">
                    <button id="godmode-hax" text-godmode>GodMode</button>
                    <button id="invulnerability-hax" text-invulnerability>Invulnerability</button>
                    <button id="speed-hax" text-speed>Speed</button>
                </div>
                <button id="modmenu-close">Close ModMenuCD</button>
            </div>
        `;
        this.isOpen = false;

        document.getElementById('html').style = this.style;
    }

    open() {
        this.isOpen = true;
        document.body.appendChild(this.modMenu);
        this.onOpen();
    }

    close() {
        this.isOpen = false;
        document.body.removeChild(this.modMenu);
    }

    onOpen() {
        while (this.isOpen) {
            GodMode.addEventListener('click', () => {
                Runner.instance_.gameOver = gameOver ? godModeEnabled : Runner.instance_.gameOver = function() {};
                Runner.instance_.setSpeed(speed ? godModeEnabled : 30);
                godModeEnabled = !godModeEnabled;
            });
            Invulnerability.addEventListener('click', () => {
                Runner.instance_.gameOver = gameOver ? invulnerabilityEnabled : Runner.instance_.gameOver = function() {};
                invulnerabilityEnabled = !invulnerabilityEnabled;
            });
            Speed.addEventListener('click', () => {
                Runner.instance_.setSpeed(speed ? speedEnabled : getSpeedFromUser);
                speedEnabled = !speedEnabled;
            });
        }
    }
}

const modMenuCD = new ModMenuCD();

const GodMode = document.getElementById('.body.modmenu.hax.godmode-hax');
const Invulnerability = document.getElementById('.body.modmenu.hax.invulnerability-hax');
const Speed = document.getElementById('.body.modmenu.hax.speed-hax');
const gameOver = Runner.instance_.gameOver;
const speed = Runner.instance_.currentSpeed();
let godModeEnabled = false;
let invulnerabilityEnabled = false;
let speedEnabled = false;

function toggleModMenu(e) {
    if (!(e instanceof KeyboardEvent) || (e instanceof KeyboardEvent && e.key === "ESC")) {
        if (modMenuCD.isOpen) modMenuCD.close() ? e instanceof KeyboardEvent : null;
        modMenuCD.isOpen = false ? e instanceof KeyboardEvent : modMenuCD.isOpen;
        return;
    }
    if (e.key.toLowerCase() === "m" || e.key.toLowerCase() === "h") {
        modMenuCD.close() ? modMenuCD.isOpen : modMenuCD.open();
        modMenuCD.isOpen = !modMenuCD.isOpen;
    }
}

document.addEventListener('keypress', toggleModMenu());
