
// Helper function to check if a string is a valid UUID
export const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Helper function to map simple IDs to sample property IDs
export const mapToSampleId = (id: string): string => {
  const idMappings: Record<string, string> = {
    '1': 'sample-1',
    '2': 'sample-2', 
    '3': 'sample-3'
  };
  
  return idMappings[id] || id;
};
