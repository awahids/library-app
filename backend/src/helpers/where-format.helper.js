const handleType = (type, value) => {
  switch (type) {
    case 'like':
      return { contains: `%${value}%` };
    case 'contains':
      return { contains: value };
    case 'startsWith':
      return { startsWith: value };
    case 'endsWith':
      return { endsWith: value };
    case 'in':
      return { in: Array.isArray(value) ? value : [value] };
    case 'notIn':
      return { notIn: Array.isArray(value) ? value : [value] };
    case 'lt':
      return { lt: value };
    case 'lte':
      return { lte: value };
    case 'gt':
      return { gt: value };
    case 'gte':
      return { gte: value };
    case 'not':
      return { not: value };
    case 'isNull':
      return { equals: null };
    case 'equals':
    default:
      return { equals: value };
  }
};

const handleFormatWhere = (filters) => {
  const where = {};

  filters?.forEach(({ parent1, parent2, field, type, value }) => {
    if (value !== undefined && value !== null && value !== '') {
      if (parent2) {
        where[parent1] = {
          ...where[parent1],
          [parent2]: {
            ...where[parent1]?.[parent2],
            [field]: handleType(type, value),
          },
        };
      } else if (parent1) {
        where[parent1] = {
          ...where[parent1],
          [field]: handleType(type, value),
        };
      } else {
        where[field] = handleType(type, value);
      }
    }
  });

  return where;
};

module.exports = {
  handleFormatWhere,
};