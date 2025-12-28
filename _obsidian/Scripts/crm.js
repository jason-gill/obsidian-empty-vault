function parseFullName(fullName) {
    // Trim whitespace and split the name by spaces
    const parts = fullName.trim().split(/\s+/);
    
    // If only one name part, return it as first name
    if (parts.length === 1) {
      return {
        firstName: parts[0],
        lastName: ''
      };
    }
    
    // Last part is always the last name
    const lastName = parts[parts.length - 1];
    
    // Everything else is the first name (including middle name if present)
    const firstName = parts.slice(0, -1).join(' ');
    
    return {
      firstName: firstName,
      lastName: lastName
    };
  }


module.exports = {
    firstname: (fullName) => parseFullName(fullName).firstName,
    lastname: (fullName) => parseFullName(fullName).lastName,
};