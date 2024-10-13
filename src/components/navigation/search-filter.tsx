"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { BoxIcon, ChefHatIcon, FilterIcon, TagsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterType = "categories" | "cuisines" | "tags";

interface SearchFilter {
  value: string;
}

interface SearchFilterProps {
  categories: SearchFilter[];
  cuisines: SearchFilter[];
  tags: SearchFilter[];
}

export default function SearchFilter({ categories, cuisines, tags }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckedChange = (type: FilterType, value: string, checked: boolean) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const existingValues = currentParams.get(type)?.split(",") || [];

    if (checked) {
      existingValues.push(value);
    } else {
      const index = existingValues.indexOf(value);
      if (index > -1) {
        existingValues.splice(index, 1);
      }
    }

    if (existingValues.length > 0) {
      currentParams.set(type, existingValues.join(","));
    } else {
      currentParams.delete(type);
    }

    router.push(`?${currentParams.toString()}`);
  };

  const isChecked = (type: FilterType, value: string) => {
    const paramValues = searchParams.get(type)?.split(",") || [];
    return paramValues.includes(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-10 w-10 items-center gap-2 p-0 sm:w-auto sm:px-4 sm:py-2">
          <FilterIcon className="size-5" />
          <span className="hidden sm:block">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BoxIcon className="mr-2 size-4" />
            Categories
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.value}
                checked={isChecked("categories", category.value)}
                onCheckedChange={(checked) =>
                  handleCheckedChange("categories", category.value, checked)
                }>
                {category.value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ChefHatIcon className="mr-2 size-4" />
            Cuisines
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {cuisines.map((cuisine) => (
              <DropdownMenuCheckboxItem
                key={cuisine.value}
                checked={isChecked("cuisines", cuisine.value)}
                onCheckedChange={(checked) =>
                  handleCheckedChange("cuisines", cuisine.value, checked)
                }>
                {cuisine.value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <TagsIcon className="mr-2 size-4" />
            Tags
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {tags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag.value}
                checked={isChecked("tags", tag.value)}
                onCheckedChange={(checked) => handleCheckedChange("tags", tag.value, checked)}>
                {tag.value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
