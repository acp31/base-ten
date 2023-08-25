"use client";
import { Grid, Container, Tabs } from "@mantine/core";
import Search from "@/features/Search";
import CompanyList from "@/features/CompanyList";
import { useCompanies } from "@/hooks/useCompany";
import {
  IconFileUpload,
  IconReportSearch,
  IconCheckupList,
} from "@tabler/icons-react";
import DropZone from "@/features/DropZone";
import { useFinacialStatements } from "@/hooks/useFinancialStatements";
import CreateCompany from "@/features/CreateCompany";
function Home() {
  const { searchTerm, handleSearch, isLoading } = useCompanies();
  const { handleUploadData } = useFinacialStatements();
  return (
    <Container my={"md"} sx={{ minHeight: 500 }}>
      <Tabs defaultValue="search" sx={{ marginBottom: 100 }}>
        <Tabs.List>
          <Tabs.Tab value="search" icon={<IconReportSearch size="0.8rem" />}>
            Search Companies
          </Tabs.Tab>
          <Tabs.Tab value="upload" icon={<IconFileUpload size="0.8rem" />}>
            File Upload
          </Tabs.Tab>
          <Tabs.Tab value="create" icon={<IconCheckupList size="0.8rem" />}>
            Create Company
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="search" pt="xs">
          <Grid>
            <Grid.Col xs={12}>
              {" "}
              <Search query={searchTerm.query} handleSearch={handleSearch} />
            </Grid.Col>
            <Grid.Col xs={12}>
              <CompanyList
                companies={searchTerm.results}
                isLoading={isLoading}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="upload" pt="xs">
          <DropZone handleUpload={handleUploadData} />
        </Tabs.Panel>
        <Tabs.Panel value="create" pt="xs">
          <CreateCompany />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default Home;
