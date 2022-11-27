export interface NavbarDTO {
  page?: string;
  items: Array<NavbarItem>;
}

export interface NavbarItem {
  isDropdown?: boolean;
  name: string;
  icon?: string;
  link?: string;
  subMenu?: Array<NavbarItem>;
  href?: string;
}
