from pathlib import Path


def load_system_prompt() -> str:
    prompt_path = Path(__file__).parent.parent / "system-prompt.txt"
    text = prompt_path.read_text(encoding="utf-8")
    # The file uses literal \n as newline markers — replace them with actual newlines
    text = text.replace("\\n", "\n")
    return text


system_prompt = load_system_prompt()
