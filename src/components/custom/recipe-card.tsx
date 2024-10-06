"use client";

import Link from "next/link";

import { EllipsisVerticalIcon, HeartIcon, PencilIcon, TrashIcon } from "lucide-react";

import { deleteRecipe, toggleFavorite } from "@/app/dashboard/recipes/actions";
import { SelectRecipe } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";

interface RecipeCardProps {
  item: SelectRecipe;
  userId?: string;
  isCarousel?: boolean;
  isFavorite?: boolean;
  className?: string;
}

export default function RecipeCard({
  item,
  userId,
  isCarousel,
  isFavorite,
  className,
}: RecipeCardProps) {
  return (
    <Card
      key={item.id}
      className={cn("max-w-sm", className)}>
      {item.image && (
        <CardHeader className="p-0">
          <Link
            className="block"
            key={item.id}
            href={`/dashboard/recipes/${item.slug}`}>
            <img
              className="rounded-t-lg"
              src={item.image}
              alt={item.title}
            />
          </Link>
        </CardHeader>
      )}
      <CardContent className="p-4 pt-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="line-clamp-1 text-sm lg:text-lg">
            <Link
              className="block"
              key={item.id}
              href={`/dashboard/recipes/${item.slug}`}>
              {item.title}
            </Link>
          </CardTitle>
          {!isCarousel && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="-mr-2 p-1"
                  variant="ghost"
                  size="unset">
                  <EllipsisVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    className="cursor-pointer"
                    href={`/dashboard/recipes/${item.slug}/edit`}>
                    <PencilIcon className="mr-2 size-4" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  asChild>
                  <form action={() => toggleFavorite(userId!, item.id)}>
                    <Button
                      variant="ghost"
                      size="unset"
                      type="submit">
                      <HeartIcon className={cn("mr-2 size-4", isFavorite && "fill-white")} />
                      <span>Favorite</span>
                    </Button>
                  </form>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  asChild>
                  <form action={() => deleteRecipe(item.id)}>
                    <Button
                      variant="ghost"
                      size="unset"
                      type="submit">
                      <TrashIcon className="mr-2 size-4" />
                      <span>Delete</span>
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <CardDescription className="line-clamp-1 text-xs lg:text-sm">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
