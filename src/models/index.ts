import global from "./global";
import login from "../pages/login/login.model"

import category from "../pages/app/base/category/category.model"
import customer from "../pages/app/base/customer/customer.model"
import product from "../pages/app/base/product/product.model"
import safetyStock from "../pages/app/base/safetyStock/safetyStock.model"
import supplier from "../pages/app/base/supplier/supplier.model"
import unit from "../pages/app/base/unit/unit.model"
import warehouse from "../pages/app/base/warehouse/warehouse.model"

export default [global, login,
    category,
    customer,
    product,
    safetyStock,
    supplier,
    unit,
    warehouse,
]