"use client";
import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import { spreadSheetToJSON } from "@/utils/csv-parser";
import { FinancialStatementCreate } from "@/models";

interface DropzoneProps {
  handleUpload: (x: FinancialStatementCreate[]) => void;
}

export default function DropZone({ handleUpload }: DropzoneProps) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      sx={{ marginTop: 32 }}
      onDrop={async (files) => {
        console.log("accepted files", files);
        const data = await spreadSheetToJSON(files[0]);
        handleUpload(data);
      }}
      onReject={(files) => console.error("rejected files", files)}
      accept={MS_EXCEL_MIME_TYPE}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag file here or click to select file
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            {`Please name file "Company Data"`}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
