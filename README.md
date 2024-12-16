
# Kategorien-Verwaltung Dokumentation

## Inhaltsverzeichnis

- [Kategorien-Verwaltung Dokumentation](#kategorien-verwaltung-dokumentation)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Einführung](#einführung)
  - [Backend: Controller](#backend-controller)
    - [Datei: `api/controllers/CategoryController.js`](#datei-apicontrollerscategorycontrollerjs)
      - [Kategorie erstellen (`create`)](#kategorie-erstellen-create)
      - [Alle Kategorien abrufen (`findAll`)](#alle-kategorien-abrufen-findall)
      - [Kategorie löschen (`delete`)](#kategorie-löschen-delete)
  - [Frontend: Vue-Komponente](#frontend-vue-komponente)
    - [Datei: `components/CategoryManager.vue`](#datei-componentscategorymanagervue)
      - [Beschreibung der Vue-Komponente](#beschreibung-der-vue-komponente)
      - [Template-Abschnitt](#template-abschnitt)
    - [Wichtige Methoden](#wichtige-methoden)
  - [API-Endpunkte](#api-endpunkte)
  - [Installation und Ausführung](#installation-und-ausführung)
    - [Backend starten](#backend-starten)
    - [Frontend starten](#frontend-starten)
  - [Deployment](#deployment)
    - [Backend-Deployment](#backend-deployment)
    - [Frontend-Deployment](#frontend-deployment)
  - [Verbesserungsvorschläge](#verbesserungsvorschläge)

---

## Einführung

 Das Backend verwendet **Node.js** und **Sails.js**, während das Frontend auf **Vue.js** basiert.

 In den folgenden Kapitel, werden die Controller erklärt.

---

## Backend: Controller

### Datei: `api/controllers/CategoryController.js`

#### Kategorie erstellen (`create`)

Erstellt eine neue Kategorie mit `name` und `description`.

```javascript
create: async function (req, res) {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description }).fetch();
    return res.json(category);
  } catch (error) {
    return res.serverError(error);
  }
}
```

**Beispiel-Request (POST):**

```json
POST /categories
Content-Type: application/json

{
  "name": "Technik",
  "description": "Alle technischen Kategorien"
}
```

---

#### Alle Kategorien abrufen (`findAll`)

Ruft alle Kategorien aus der Datenbank ab.

```javascript
findAll: async function (req, res) {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.serverError(error);
  }
}
```

**Beispiel-Request (GET):**

```http
GET /categories
```

---

#### Kategorie löschen (`delete`)

Löscht eine Kategorie anhand ihrer `id`.

```javascript
delete: async function (req, res) {
  try {
    await Category.destroyOne({ id: req.params.id });
    return res.json({ message: "Kategorie gelöscht" });
  } catch (error) {
    return res.serverError(error);
  }
}
```

**Beispiel-Request (DELETE):**

```http
DELETE /categories/:id
```

---

## Frontend: Vue-Komponente

### Datei: `components/CategoryManager.vue`

#### Beschreibung der Vue-Komponente

Diese Vue-Komponente ermöglicht es, Kategorien zu erstellen, anzuzeigen und zu löschen. Sie kommuniziert mit dem Backend über API-Endpunkte.

#### Template-Abschnitt

```html
<form @submit.prevent="saveCategory">
  <input v-model="category.name" placeholder="Kategorie-Name" required />
  <input v-model="category.description" placeholder="Beschreibung" />
  <button type="submit">Kategorie hinzufügen</button>
</form>

<ul>
  <li v-for="cat in categories" :key="cat.id">
    {{ cat.name }} - {{ cat.description }}
    <button @click="deleteCategory(cat.id)">Löschen</button>
  </li>
</ul>
```

---

### Wichtige Methoden

1. **`fetchCategories`**: Lädt alle Kategorien.

   ```javascript
   async fetchCategories() {
     try {
       const response = await api.get("/categories");
       this.categories = response.data;
     } catch (error) {
       console.error("Fehler beim Laden der Kategorien:", error);
     }
   }
   ```

2. **`saveCategory`**: Erstellt eine neue Kategorie.

   ```javascript
   async saveCategory() {
     try {
       await api.post("/categories", this.category);
       this.category = { name: "", description: "" };
       this.fetchCategories();
     } catch (error) {
       console.error("Fehler beim Speichern der Kategorie:", error);
     }
   }
   ```

3. **`deleteCategory`**: Löscht eine Kategorie.

   ```javascript
   async deleteCategory(id) {
     try {
       await api.delete(`/categories/${id}`);
       this.fetchCategories();
     } catch (error) {
       console.error("Fehler beim Löschen der Kategorie:", error);
     }
   }
   ```

---

## API-Endpunkte

| **Methode** | **Pfad**           | **Beschreibung**            |
|-------------|--------------------|-----------------------------|
| `POST`     | `/categories`       | Erstellt eine neue Kategorie |
| `GET`      | `/categories`       | Ruft alle Kategorien ab     |
| `DELETE`   | `/categories/:id`   | Löscht eine Kategorie       |

---

## Installation und Ausführung

### Backend starten

```bash
cd backend
npm install
sails lift
```

### Frontend starten

```bash
cd frontend
npm install
npm run serve
```

---

## Deployment

### Backend-Deployment

1. **Build erstellen**

   ```bash
   sails build --prod
   ```

2. **Server starten**

   ```bash
   node app.js
   ```

### Frontend-Deployment

1. **Build erstellen**

   ```bash
   npm run build
   ```

2. **Build-Ordner auf Server hochladen**

   ```bash
   scp -r dist/ user@server:/path/to/deploy
   ```

---

## Verbesserungsvorschläge

- **Validierung hinzufügen**: Sicherstellen, dass Eingaben korrekt validiert werden.
- **Error Handling**: Benutzerfreundliche Fehlermeldungen anzeigen.
- **Styling verbessern**: UI/UX durch bessere CSS-Stile optimieren.
- **Pagination**: Implementiere eine Paginierung für die Kategorienliste bei großen Datenmengen.
- **Authentifizierung**: Zugriff auf die Kategorien-Verwaltung durch Benutzer-Authentifizierung sichern.

---

© 2024 Kategorien-Verwaltung Projekt. Alle Rechte vorbehalten.
