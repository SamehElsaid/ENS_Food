import axios from "axios";
import { useTranslation } from "../i18n";
import HomePage from "./components/HomePage/HomePage";

async function fetchData() {
  try {
    const categoryResponse = await axios.get(`${process.env.API_URL}/category`);
    const categories = categoryResponse.data.results;

    const mealPromises = categories.map(async (cat) => {
      const mealWithCategoryResponse = await axios.get(
        `${process.env.API_URL}/meals/?category=${cat.id}`
      );
      return {
        data: mealWithCategoryResponse.data.results,
        next: mealWithCategoryResponse.data.next,
        previous: mealWithCategoryResponse.data.previous,
      };
    });

    const meals = await Promise.all(mealPromises);

    return { data: categories, meal: meals };
  } catch (error) {
    return false;
  }
}

export default async function Page({ params: { lng } }) {
  const { t, i18n } = await useTranslation(lng);
  const data = await fetchData();
  const title = t("title");
  const seeMore = t("see-more");
  const price = t("price");
  const error = t("error");
  const arrive = t("arrive");
  const time = t("time");
  const min = t("min");
  const money = t("price");
  const Order = t("Order");
  return (
    <HomePage
      arrive={arrive}
      min={min}
      time={time}
      error={error}
      price={price}
      seeMore={seeMore}
      data={data}
      money={money}
      title={title}
      Order={Order}
      lang={i18n.resolvedLanguage}
    />
  );
}
