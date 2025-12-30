import { supabase } from './supabase';
import { Customer, Invoice, InvoiceItem, Product, Expense } from '@/types';

// --- Expenses ---

export async function getExpenses() {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }

    return data as Expense[];
}

export async function createExpense(expense: Partial<Expense>) {
    const { data, error } = await supabase
        .from('expenses')
        .insert([{
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            recipient: expense.recipient
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating expense:', error);
        throw error;
    }

    return data as Expense;
}

export async function deleteExpense(id: string) {
    const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
}

// --- Products ---

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

    return data as Product[];
}

export async function createProduct(product: Partial<Product>) {
    const { data, error } = await supabase
        .from('products')
        .insert([{
            name: product.name,
            sku: product.sku,
            price: product.price,
            unit: product.unit,
            description: product.description,
            category: 'general' // Default category
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }

    return data as Product;
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// --- Customers ---

export async function getCustomers() {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }

    return data as Customer[];
}

export async function createCustomer(customer: Partial<Customer>) {
    const { data, error } = await supabase
        .from('customers')
        .insert([{
            name: customer.name,
            tax_id: customer.taxId,
            address: customer.address,
            email: customer.email,
            phone: customer.phone,
            branch: customer.branch
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating customer:', error);
        throw error;
    }

    return data as Customer;
}

// --- Invoices ---

export async function getInvoices() {
    const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    // Convert snake_case to camelCase mapping if needed, 
    // but for now let's assume we might need a mapper or adjust Types.
    // Actually, Supabase returns what is in DB (snake_case columns).
    // Our Types are camelCase. We need a mapper.

    return data.map((inv: any) => ({
        id: inv.id,
        number: inv.number,
        date: new Date(inv.date),
        dueDate: new Date(inv.due_date),
        customerId: inv.customer_id,
        customerName: inv.customer_name,
        customerAddress: inv.customer_address,
        customerTaxId: inv.customer_tax_id,
        subtotal: inv.subtotal,
        discountTotal: inv.discount_total,
        vatTotal: inv.vat_total,
        grandTotal: inv.grand_total,
        status: inv.status,
        notes: inv.notes,
        createdAt: new Date(inv.created_at)
    })) as Invoice[];
}

export async function createInvoice(invoice: Invoice) {
    // This tool call is premature, I should check types.ts first to add Expense type.
    // Cancelling this replace to check types. Insert Invoice
    const { data: invData, error: invError } = await supabase
        .from('invoices')
        .insert([{
            number: invoice.number,
            date: invoice.date,
            due_date: invoice.dueDate,
            customer_id: invoice.customerId,
            customer_name: invoice.customerName,
            customer_address: invoice.customerAddress,
            customer_tax_id: invoice.customerTaxId,
            subtotal: invoice.subtotal,
            discount_total: invoice.discountTotal,
            vat_total: invoice.vatTotal,
            grand_total: invoice.grandTotal,
            status: invoice.status,
            notes: invoice.notes
        }])
        .select()
        .single();

    if (invError) throw invError;
    const newInvoiceId = invData.id;

    // 2. Insert Items
    const itemsToInsert = invoice.items.map(item => ({
        invoice_id: newInvoiceId,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        vat_rate: item.vatRate
    }));

    const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert);

    if (itemsError) {
        // Rollback? Supabase doesn't support transaction via JS client easily yet without RPC.
        // For now, we accept risk or use RPC.
        console.error('Error creating items:', itemsError);
        // Clean up invoice if items fail
        await supabase.from('invoices').delete().eq('id', newInvoiceId);
        throw itemsError;
    }

    return newInvoiceId;
}

export async function getInvoiceById(id: string) {
    const { data, error } = await supabase
        .from('invoices')
        .select(`
            *,
            invoice_items (*)
        `)
        .eq('id', id)
        .single();

    if (error) throw error;

    // Map to camelCase
    return {
        id: data.id,
        number: data.number,
        date: new Date(data.date),
        dueDate: new Date(data.due_date),
        customerId: data.customer_id,
        customerName: data.customer_name,
        customerAddress: data.customer_address,
        customerTaxId: data.customer_tax_id,
        subtotal: data.subtotal,
        discountTotal: data.discount_total,
        vatTotal: data.vat_total,
        grandTotal: data.grand_total,
        status: data.status,
        notes: data.notes,
        createdAt: new Date(data.created_at),
        items: data.invoice_items.map((item: any) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
            vatRate: item.vat_rate
        }))
    } as Invoice;
}

