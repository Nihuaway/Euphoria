export enum ECategory {
  all = 'All',
  animations = 'Animations',
  branding = 'Branding',
  illustration = 'Illustration',
  mobile = 'Mobile',
  print = 'Print',
  product = 'Product Design',
  typography = 'Typography',
  web = 'Web Design',
}

export enum ESorting {
  popular = 'Popular',
  newest = 'Newest',
  following = 'Following',
}

export enum ETimeFrame {
  week = 'This Past Week',
  month = 'This Past Month',
  year = 'This Past Year',
  all = 'All Time',
  now = 'Now',
}

export const sortItems = [
  ESorting.popular,
  ESorting.newest,
  ESorting.following,
];
export const categoryItems = [
  ECategory.all,
  ECategory.animations,
  ECategory.branding,
  ECategory.illustration,
  ECategory.mobile,
  ECategory.print,
  ECategory.product,
  ECategory.typography,
  ECategory.web,
];
export const timeFrameItems = [
  ETimeFrame.week,
  ETimeFrame.month,
  ETimeFrame.year,
  ETimeFrame.all,
  ETimeFrame.now,
];

export const normalize = (value: string | undefined, spaceTo: string) => {
  if(!value) return '';
  return value.replace(/\s/g, spaceTo).toLowerCase();
};
