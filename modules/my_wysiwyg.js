export class MyWysiwyg {
  constructor(container, options = {}) {
    this.container = container;
    this.options = { ...this.defaultOptions, ...options };

    this.setupEditor();
    this.setupEventListeners();
    this.generateCSS();
  }
  //All option available
  defaultOptions = {
    buttons: [
      "gras",
      "italique",
      "barré",
      "couleur",
      "police",
      "lien",
      "taille",
      "plus",
      "minus",
      "gauche",
      "centrer",
      "droite",
      "justifier",
      "youtube",
      "image",
      "maps",
    ],
  };

  //generate css function
  generateCSS() {
    const styles = `
      .editor-container {
          box-sizing: border-box;
          border: 1px solid #ccc;
          padding: 10px;
          width: 70vw;
      }

      .editor-toolbar {
          box-sizing: border-box;
          background-color: #f0f0f0;
          padding: 5px;
          border-bottom: 1px solid #ccc;
      }

      .editor-toolbar button {
          margin-right: 5px;
          padding: 5px 10px;
          cursor: pointer;
      }

      .editable-content {
          box-sizing: border-box;
          border: 1px solid #ccc;
          padding: 10px;
          margin-top: 10px;
          min-height: 100px;
          height: 50vh;
      }

      .aligned-container {
          display: flex;
          width: 100%;
      }

      .button-active {
          background-color: green;
          color: white; 
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;

    document.head.appendChild(styleElement);
  }

  //create the code function
  setupEditor() {
    const editorContainer = document.createElement("div");
    editorContainer.className = "editor-container";
    editorContainer.style.boxSizing = "border-box";
    editorContainer.style.border = "1px solid #ccc";
    editorContainer.style.padding = "10px";
    editorContainer.style.width = "70vw";

    const toolbar = document.createElement("div");
    toolbar.className = "editor-toolbar"; 
    toolbar.style.boxSizing = "border-box";
    toolbar.style.backgroundColor = "#f0f0f0";
    toolbar.style.padding = "5px";
    toolbar.style.borderBottom = "1px solid #ccc";

    this.options.buttons.forEach((buttonType) => {
        if (this.defaultOptions.buttons.includes(buttonType)) {
            const button = this.createButton(buttonType);
            button.style.marginRight = "5px";
            button.style.padding = "5px 10px";
            button.style.cursor = "pointer";
            button.addEventListener("click", () => this.toggleStyle(buttonType));
            toolbar.appendChild(button);
        }
    });

    editorContainer.appendChild(toolbar);

    const editableDiv = document.createElement("div");
    editableDiv.contentEditable = true;
    editableDiv.id = "texte-area";
    editableDiv.className = "editable-content"; 
    editableDiv.style.boxSizing = "border-box";
    editableDiv.style.border = "1px solid #ccc";
    editableDiv.style.padding = "10px";
    editableDiv.style.marginTop = "10px";
    editableDiv.style.minHeight = "100px";
    editableDiv.style.height = "50vh";

    editorContainer.appendChild(editableDiv);

    this.container.replaceWith(editorContainer);

    this.editor = editorContainer; 

    this.editableDiv = editableDiv;

    // Vérifie si le localStorage contient du contenu et l'affiche dans la zone de texte
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
        editableDiv.innerHTML = savedContent;
    }

    this.setupEventListeners();
}


  saveContent() {
    const content = document.getElementById("texte-area").innerHTML;
    localStorage.setItem("content", content);
  }

  //Create Button with option selected
  createButton(buttonType) {
    const button = document.createElement("button");
    button.textContent = buttonType;
    button.id = buttonType;
    return button;
  }

  toggleStyle(buttonType) {
    const button = document.getElementById(buttonType);
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    switch (buttonType) {
      // Case Bold
      case "gras":
        const isBold = this.toggleBoldState();
        this.toggleButtonStyle(button, isBold);
        const boldSpan = document.createElement("span");
        if (isBold) {
          boldSpan.style.fontWeight = "bold";
        } else {
          boldSpan.style.fontWeight = "normal";
        }
        boldSpan.textContent = selectedText;
        range.deleteContents();
        range.insertNode(boldSpan);
        break;

      // Case Italic
      case "italique":
        const isItalic = this.toggleItalicState();
        this.toggleButtonStyle(button, isItalic);
        const italicSpan = document.createElement("span");
        if (isItalic) {
          italicSpan.style.fontStyle = "italic";
        } else {
          italicSpan.style.fontStyle = "normal";
        }
        italicSpan.textContent = selectedText;
        range.deleteContents();
        range.insertNode(italicSpan);
        break;

      // Case Barré
      case "barré":
        const isStrikethrough = this.toggleStrikethroughState();
        this.toggleButtonStyle(button, isStrikethrough);
        const strikethroughSpan = document.createElement("span");
        if (isStrikethrough) {
          strikethroughSpan.style.textDecoration = "line-through";
        } else {
          strikethroughSpan.style.textDecoration = "none";
        }
        strikethroughSpan.textContent = selectedText;
        range.deleteContents();
        range.insertNode(strikethroughSpan);
        break;

      // Case Couleur
      case "couleur":
        console.log("Fonctionnalité Couleur pas encore presente");
        break;

      // Case Police
      case "police":
        this.chooseFont();

        break;

      // Case Lien
      case "lien":
        console.log("Fonctionnalité Lien pas encore presente");
        break;

      // Case Taille
      case "taille":
        this.applySize();
        break;

      // Case Plus
      case "plus":
        this.toggleSize(true);
        break;

      // Case Minus
      case "minus":
        this.toggleSize(false);
        break;

      // Case Gauche, Centrer, Droite
      case "gauche":
      case "centrer":
      case "droite":
        this.applyAlignment(buttonType, selectedText);
        break;

      // Case Justifier
      case "justifier":
        console.log("Fonctionnalité Justifier pas encore presente");
        break;

      // Case Enregistrer
      case "enregistrer":
        console.log("Fonctionnalité Enregistrer pas encore presente");
        break;

      // Case YouTube
      case "youtube":
        this.ytbLink();
        break;

      // Case Image
      case "image":
        this.chooseImg();
        break;
      //Case maps
      case "maps":
        this.showGoogleMap();
        break;
      // Default
      default:
        console.log("Type de bouton non géré : " + buttonType);
    }
    this.saveContent();
    this.checkAndClearStyles();
  }

  //Toggle green BG if button active
  toggleButtonStyle(button, isActive) {
    if (isActive) {
      button.classList.add("button-active");
    } else {
      button.classList.remove("button-active");
    }
  }

 //Check if the area is empty
setupEventListeners() {
  this.editableDiv.addEventListener("input", () => {
    this.checkAndClearStyles();
  });

  }

  //Clear style if area empty
  checkAndClearStyles() {
    const content = this.editableDiv.textContent.trim();
    if (content === "") {
      console.log("La zone de texte est vide. Suppression des styles.");

      this.editableDiv.classList.remove("empty");

      this.options.buttons.forEach((buttonType) => {
        const button = document.getElementById(buttonType);
        if (button) {
          button.classList.remove("button-active");
        }

        // Réinitialisez les états des boutons à "false"
        switch (buttonType) {
          case "gras":
            this.vargras = false;
            break;
          case "italique":
            this.varitalique = false;
            break;
          case "barré":
            this.isStrikethrough = false;
            break;
          case "couleur":
            break;
          case "police":
            break;
          case "lien":
            break;
          case "taille":
            break;
          case "plus":
            break;
          case "minus":
            break;
          case "gauche":
          case "centrer":
          case "droite":
            break;
          case "justifier":
            break;
          case "enregistrer":
            break;
          case "youtube":
            break;
          case "image":
            break;
        }
      });
    } else {
      this.editableDiv.classList.remove("empty");
    }
  }

  // Toggle bold function
  toggleBoldState() {
    this.vargras = !this.vargras;
    return this.vargras;
  }

  //Toggle italic function
  toggleItalicState() {
    this.varitalique = !this.varitalique;
    return this.varitalique;
  }

  //Toggle Strikethrough function
  toggleStrikethroughState() {
    this.isStrikethrough = !this.isStrikethrough;
    return this.isStrikethrough;
  }

  //Choose size function
  applySize() {
    const getSize = prompt("Veuillez entrer la taille de la police");
    if (getSize !== null) {
      const size = parseInt(getSize);

      if (!isNaN(size) && size > 0 && size <= 100) {
        const span = document.createElement("span");
        span.style.fontSize = `${size}px`;
        span.textContent = document.getSelection().toString();

        const range = document.getSelection().getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
      } else {
        alert(
          "Veuillez entrer un nombre entier positif pour la taille de la police et inférieur ou égal a 100."
        );
      }
    }
  }

  //Choose alignment function
  applyAlignment(alignment, selectedText) {
    const container = document.createElement("div");
    container.classList.add("aligned-container");

    const alignedElement = document.createElement("div");
    alignedElement.textContent = selectedText;

    container.appendChild(alignedElement);

    const range = document.getSelection().getRangeAt(0);
    range.deleteContents();

    range.insertNode(container);

    if (alignment === "gauche") {
      container.style.justifyContent = "flex-start";
    } else if (alignment === "centrer") {
      container.style.justifyContent = "center";
    } else if (alignment === "droite") {
      container.style.justifyContent = "flex-end";
    }
  }

  //Increase or decrease line
  toggleSize(increase) {
    const currentThickness = this.lineThroughThickness || 0;

    const span = document.createElement("span");
    span.style.textDecoration = `line-through solid #000`;
    span.style.textDecorationThickness = `${
      increase ? currentThickness + 2 : Math.max(currentThickness - 2, 0)
    }px`;

    span.textContent = document.getSelection().toString();

    const range = document.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);

    this.lineThroughThickness = parseInt(span.style.textDecorationThickness);
  }

  //Create ytbLink
  ytbLink() {
    var link = prompt("Entrez le lien YouTube:");

    if (link && link.includes("youtube.com")) {
      var videoId = link.split("v=")[1];

      var iframe = document.createElement("iframe");
      iframe.width = "auto";
      iframe.height = "auto";
      iframe.src = "https://www.youtube.com/embed/" + videoId;
      iframe.allowFullscreen = true;

      this.editableDiv.appendChild(iframe);
    } else {
      alert("Lien YouTube invalide. Veuillez entrer un lien valide.");
    }
  }

  //Choose police function
  chooseFont() {
    const selectedText = document.getSelection().toString();

    const fontOptions = [
      "Arial",
      "Times New Roman",
      "Courier New",
      "Verdana",
      "Georgia",
      "Comic Sans MS",
    ];

    const fontOptionsList = fontOptions.join("\n");

    const selectedFont = prompt(
      `Veuillez sélectionner une police :\n${fontOptionsList}`
    );

    if (
      selectedFont !== null &&
      selectedFont !== undefined &&
      fontOptions.includes(selectedFont)
    ) {
      const fontSpan = document.createElement("span");
      fontSpan.style.fontFamily = selectedFont;
      fontSpan.textContent = selectedText;

      const range = document.getSelection().getRangeAt(0);
      range.deleteContents();
      range.insertNode(fontSpan);
    } else {
      alert("Police invalide ou aucune police sélectionnée.");
    }
  }

  // Choose image function
  chooseImg() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => this.handleImageUpload(event));
    input.click();
  }

  handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.insertImage(img);
        };
        img.src = e.target.result;
      };

      if (this.isValidImageType(file)) {
        reader.readAsDataURL(file);
      } else {
        alert("Veuillez sélectionner une image au format JPG ou PNG.");
      }
    }
  }

  isValidImageType(file) {
    const validTypes = ["image/jpeg", "image/png"];
    return validTypes.includes(file.type);
  }

  insertImage(img) {
    img.width = 200;
    img.height = 200;

    const range = document.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(img);
  }

  showGoogleMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const mapIframe = document.createElement("iframe");
          mapIframe.width = "100%";
          mapIframe.height = "300";
          // mapIframe.src = "https://www.google.com/maps/embed/v1/view?key=-----------------insert google api key---------------------------&center=" + latitude + "," + longitude + "&zoom=15";


          this.editableDiv.appendChild(mapIframe);
        },
        (error) => {
          console.error("Error getting user's location:", error);
          alert("Error getting user's location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}