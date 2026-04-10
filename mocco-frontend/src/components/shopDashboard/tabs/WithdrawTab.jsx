import { Trash2 } from "lucide-react";
import AddBankAccountModal from "../modals/AddBankAccountModal";

const WithdrawTab = ({
  availableBalance,
  bankAccounts,
  selectedBankAccountId,
  onSelectBankAccount,
  withdrawInput,
  onChangeWithdrawInput,
  formatMoney,
  withdrawAmount,
  fee,
  userReceives,
  onOpenBankModal,
  onDeleteBankAccount,
  onSubmitWithdrawRequest,
  canSubmitWithdraw,
  withdrawals,
  showBankModal,
  onCloseBankModal,
  onAddBankAccount,
  pakistanBanks,
}) => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
      Withdraw Money
    </h2>

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
      <p className="text-3xl font-semibold text-emerald-600 sm:text-4xl">
        {formatMoney(availableBalance)}
      </p>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        Current withdrawable balance
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Your Bank Accounts
        </h3>
        <button
          type="button"
          onClick={onOpenBankModal}
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:text-base"
        >
          + Add New Account
        </button>
      </div>

      {bankAccounts.length ? (
        <div className="space-y-3">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
            >
              <div>
                <p className="text-base font-semibold text-slate-800 sm:text-lg">
                  {account.bankName}
                </p>
                <p className="text-sm text-slate-600 sm:text-base">
                  {account.accountHolderName}
                </p>
                <p className="text-sm text-slate-500">
                  {account.accountMasked}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDeleteBankAccount(account.id)}
                className="cursor-pointer rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100"
                aria-label="Delete bank account"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
          <p className="text-slate-500">No bank accounts added</p>
        </div>
      )}
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        Withdrawal Request
      </h3>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-slate-700">
          Select Bank Account
        </span>
        <select
          value={selectedBankAccountId}
          onChange={(event) => onSelectBankAccount(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          disabled={!bankAccounts.length}
        >
          {!bankAccounts.length ? (
            <option value="">No bank accounts available</option>
          ) : (
            bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankName} ({account.accountMasked})
              </option>
            ))
          )}
        </select>
      </label>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-semibold text-slate-700">
          Withdrawal Amount ($)
        </span>
        <input
          type="number"
          value={withdrawInput}
          onChange={(event) => onChangeWithdrawInput(event.target.value)}
          min="0"
          step="0.01"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none"
        />
      </label>

      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        Maximum: {formatMoney(availableBalance)}
      </p>

      {withdrawAmount > 0 && (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <p className="text-sm sm:text-base">
            Amount: {formatMoney(withdrawAmount)}
          </p>
          <p className="text-sm sm:text-base">
            Platform fee (10%): {formatMoney(fee)}
          </p>
          <p className="text-sm font-semibold sm:text-base">
            You receive: {formatMoney(userReceives)}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onSubmitWithdrawRequest}
        disabled={!canSubmitWithdraw}
        className="mt-4 w-full cursor-pointer rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 sm:text-lg"
      >
        Submit Withdrawal Request
      </button>

      {withdrawAmount > availableBalance && (
        <p className="mt-2 text-sm font-medium text-rose-600">
          Withdrawal amount cannot be greater than your available balance.
        </p>
      )}
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        Recent Withdrawals
      </h3>

      {!withdrawals.length ? (
        <p className="mt-3 text-slate-500">
          No withdrawal request submitted yet.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {[...withdrawals]
            .sort(
              (a, b) =>
                new Date(b?.createdAt || 0).getTime() -
                new Date(a?.createdAt || 0).getTime(),
            )
            .slice(0, 5)
            .map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold text-slate-800 sm:text-lg">
                    {formatMoney(item.amount)} to {item.bankName}
                  </p>
                  <p className="rounded-md bg-slate-100 px-2 py-1 text-sm font-semibold capitalize text-slate-700">
                    {item.status}
                  </p>
                </div>
                <p className="mt-1 text-sm text-slate-600 sm:text-base">
                  {item.accountHolderName} • **** **** {item.accountLast4}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Fee: {formatMoney(item.fee)} | You receive:{" "}
                  {formatMoney(item.netAmount)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>

    <AddBankAccountModal
      open={showBankModal}
      loading={false}
      onClose={onCloseBankModal}
      onSubmit={onAddBankAccount}
      pakistanBanks={pakistanBanks}
    />
  </div>
);

export default WithdrawTab;
