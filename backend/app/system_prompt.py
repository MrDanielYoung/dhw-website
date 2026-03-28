from pathlib import Path


def load_system_prompt() -> str:
    prompt_path = Path(__file__).parent.parent / "system-prompt.txt"
    return prompt_path.read_text(encoding="utf-8")


system_prompt = load_system_prompt()
