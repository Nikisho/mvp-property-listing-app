import React from 'react'
interface FormData {
    costOfRooms: string;
    deposit: string;
};

interface CostFormProps extends FormData {
    updateFields: (fields: Partial<FormData>) => void;
};

const CostForm: React.FC<CostFormProps> = (

) => {
  return (
    <div>CostForm</div>
  )
}

export default CostForm