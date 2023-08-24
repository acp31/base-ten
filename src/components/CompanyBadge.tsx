import { Badge } from "@mantine/core";
function CompanyBadge({ item }: { item: string }) {
  return (
    <Badge color={"blue"} variant={"outline"}>
      {item}
    </Badge>
  );
}

export default CompanyBadge;
