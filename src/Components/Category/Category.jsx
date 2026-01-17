import React from "react";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";
import categoryInfos from "./categoryFullInfos";

function Category() {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  );
}

export default Category;
