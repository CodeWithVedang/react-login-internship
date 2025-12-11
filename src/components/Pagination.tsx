import React from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

// Simple pagination showing previous/next / page number
const Pagination: React.FC<Props> = ({ current, total, onChange }) => {
  const prev = () => onChange(Math.max(1, current - 1));
  const next = () => onChange(Math.min(total, current + 1));

  return (
    <HStack spacing={4} justify="center" mt={4}>
      <Button onClick={prev} disabled={current === 1}>Prev</Button>
      <Text>Page {current} of {total}</Text>
      <Button onClick={next} disabled={current === total}>Next</Button>
    </HStack>
  );
};

export default Pagination;
