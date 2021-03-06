<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
    public function getCustomers(Request $request)
    {
        $per_page = (int)$request->query("per_page", 10);
        return Customer::orderBy("id", "ASC")->paginate($per_page);
    }

    public function getCustomersByQuery(Request $request)
    {
        $limit = (int)$request->query("limit", 10);
        $name = $request->query("query", "");
        $query = Customer::where("name", "ilike", "%" . $name . "%");
        if (is_numeric($name)) {
            $query = $query->orWhere("id",$name);
        }
        $query = $query->orderBy("id", "ASC");
        return $query->take($limit)->get();
    }


    public function createCustomer(Request $request)
    {
        $request->validate([
            "name" => "required|min:2|max:35",
            "address" => "required",
            "city" => "required",
            "postcode" => "required|regex:/^[0-9 ]+$/",
        ]);
        $customer = new Customer($request->all());
        $customer->save();
        return response($customer, 201);
    }

    public function updateCustomer(Request $request)
    {
        $request->validate([
            "id" => "required",
            "name" => "required|min:2|max:35",
            "address" => "required",
            "city" => "required",
            "postcode" => "required|regex:/^[0-9 ]+$/",
        ]);

        $customer = Customer::find($request->input("id"));
        $customer->update($request->all());
        return response($customer, 201);
    }

    public function deleteCustomer($id)
    {
        $deleted = Customer::destroy($id);
        if ($deleted) {
            return response(null, 200);
        } else {
            return response(["id" => $id, "error" => "This customer doesn't exist."], 404);
        }
    }
}
