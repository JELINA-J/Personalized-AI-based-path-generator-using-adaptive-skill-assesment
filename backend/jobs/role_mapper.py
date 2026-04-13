ROLE_BY_LEVEL = {
    "Beginner": ["Intern", "Trainee", "Associate"],
    "Intermediate": ["Junior Developer", "Associate Developer"],
    "Advanced": ["Software Development Engineer", "SDE", "Software Engineer"],
}

def get_roles(level: str):
    return ROLE_BY_LEVEL.get(level, [])
