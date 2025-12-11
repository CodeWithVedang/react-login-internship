// src/pages/Dashboard.tsx
import React, { useMemo, useState } from 'react';
import {
  Box, Grid, GridItem, Heading, Text, Button, Flex, Spacer, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';

type Item = { id: number; name: string; category: string; description: string; };

const ALL_ITEMS: Item[] = Array.from({ length: 47 }).map((_, i) => {
  const cats = ['frontend', 'backend', 'devops'];
  const category = cats[i % cats.length];
  return {
    id: i + 1,
    name: `Project ${i + 1}`,
    category,
    description: `This is a short description for project ${i + 1}. Category: ${category}`,
  };
});

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const pageSize = useBreakpointValue({ base: 5, md: 8 }) || 8;

  const filtered = useMemo(() => {
    let list = ALL_ITEMS;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((it) => it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q));
    }
    if (filter) {
      list = list.filter((it) => it.category === filter);
    }
    return list;
  }, [query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // text colors that adapt to color mode
  const titleColor = useColorModeValue('gray.800', 'gray.100');
  const descColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      <Flex align="center" mb={4} gap={4} flexWrap="wrap">
        <Heading size="md" color={titleColor}>Dashboard</Heading>
        <Text color={descColor}>Welcome, {user?.name || 'User'}.</Text>
        <Spacer />
        <Button colorScheme="red" variant="outline" onClick={logout}>Logout</Button>
      </Flex>

      <SearchFilter query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
        {visible.map((item) => (
          <GridItem key={item.id} bg={cardBg} p={4} borderRadius="md" boxShadow="sm">
            <Heading size="sm" mb={2} color={titleColor}>{item.name}</Heading>
            <Text fontSize="sm" color={descColor} mb={3}>{item.description}</Text>
            <Text fontSize="xs" color="blue.400" mb={3}>Category: {item.category}</Text>
            <Button size="sm" colorScheme="blue">Open</Button>
          </GridItem>
        ))}
      </Grid>

      {filtered.length === 0 && <Text mt={4} color={descColor}>No items match your search/filter.</Text>}

      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    </Box>
  );
};

export default Dashboard;
