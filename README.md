# 🧙‍♂️ D&D Combat Narrator – Voice-Driven Assistant for Dungeon Masters

This project is an interactive, voice-enabled web tool that helps narrate epic combat scenes in a Dungeons & Dragons (D&D) campaign. It allows the DM (or player) to choose a character, weapon/spell, enemy, and enter dice rolls manually to generate immersive narrative responses using AI.

## 🔮 Features

- 🎙️ **Voice recognition**: Speak your action aloud (e.g., *"Ataco al orco con mi arco"*) and let the tool handle the narrative.
- 🧝 **Character selection**: Load character stats (class, level, HP, weapons, spells, image/token) from a JSON config.
- ⚔️ **Weapon/spell selection**: Automatically updates available options based on the selected character.
- 👹 **Enemy targeting**: Choose from a list of enemies and generate responses based on dice roll results.
- 📝 **Manual dice input**: Enter physical dice roll results (attack and damage), and the AI narrates based on that.
- 🗣️ **Natural AI voice**: Uses browser Speech Synthesis with selectable voices for immersive storytelling.
- 📋 **Clipboard integration**: Easily copy generated narration for use in VTTs or notes.
- 🎭 **Critical hits & failures**: Narration adapts based on roll results (1 = fail, 20 = crit success).

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/SGC11PRO/dnd-app.git
cd dnd-app
```

2. Open the `index.html` on your browser
3. **Customize characters, weapons and spells.** Edit `estadoPartida` object and change property values to customize the tool

## 📁 Project Structure
```bash
/public
  /images
    ivor.png
    bofur.png
    erevan.png
index.html
styles.css
main.js
```
## 🧠 How It Works
- The user selects a character and an enemy.
- The tool updates weapons/spells based on that character.
- The user either types or speaks the action.
- Dice results are entered manually.
- AI (via puter.ai.chat) receives full context and generates a 3-line narrative.
- The response is read aloud using a selected voice and displayed on screen.

## 🧪 Tech Stack
- Vanilla JS / HTML / CSS
- Web Speech API – Speech recognition & synthesis
- Puter.ai – AI-powered response generation
- Manual JSON config for easy character/enemy management

## 🧰 Future Features (Ideas)
- Initiative tracker
- HP auto-tracking per enemy
- Conditions (prone, stunned, etc.)
- Round-based combat manager
- Multilingual voice options

---
Feel free to fork, expand or use in your own homebrew adventures. 🎲
---
Let me know if you'd like:
- Badges (GitHub stars, license, etc.)
- A dark/light theme toggle
- JSON moved to a separate file for modularity
- Live demo deployment instructions (e.g., GitHub Pages)
